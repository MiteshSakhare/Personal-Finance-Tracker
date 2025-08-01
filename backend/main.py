from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Transaction, Budget
import crud
import schemas
from fastapi.middleware.cors import CORSMiddleware
from datetime import date

# Create tables
Base.metadata.create_all(bind=engine)

# Create the FastAPI app instance
app = FastAPI(title="Finance Tracker API", version="1.0.0")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Finance Tracker API is running", "status": "active"}

@app.post("/transactions/", response_model=schemas.Transaction)
def create_transaction(transaction: schemas.TransactionCreate, db: Session = Depends(get_db)):
    return crud.create_transaction(db, transaction)

@app.get("/transactions/", response_model=list[schemas.Transaction])
def read_transactions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_transactions(db, skip, limit)

@app.post("/budgets/", response_model=schemas.Budget)
def create_budget(budget: schemas.BudgetCreate, db: Session = Depends(get_db)):
    return crud.create_budget(db, budget)

@app.get("/budgets/", response_model=list[schemas.Budget])
def read_budgets(db: Session = Depends(get_db)):
    return crud.get_budgets(db)

@app.get("/summary/")
def get_summary(db: Session = Depends(get_db)):
    return crud.get_summary(db)

# Database reset endpoint - Make sure this exists
@app.delete("/reset/")
def reset_database(db: Session = Depends(get_db)):
    try:
        # Delete all data
        deleted_transactions = db.query(Transaction).delete()
        deleted_budgets = db.query(Budget).delete()
        db.commit()
        return {
            "message": "Database reset successfully",
            "deleted_transactions": deleted_transactions,
            "deleted_budgets": deleted_budgets
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to reset database: {str(e)}")

# Add sample data on startup
@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    try:
        # Create sample transactions if none exist
        if db.query(Transaction).count() == 0:
            sample_transactions = [
                {"amount": 2500, "description": "Salary", "type": "income", "category": "Salary", "date": date(2023, 7, 1)},
                {"amount": 150, "description": "Groceries", "type": "expense", "category": "Food", "date": date(2023, 7, 5)},
                {"amount": 50, "description": "Bus fare", "type": "expense", "category": "Transport", "date": date(2023, 7, 10)}
            ]
            for t in sample_transactions:
                db.add(Transaction(**t))
            db.commit()
        
        # Create sample budgets if none exist
        if db.query(Budget).count() == 0:
            sample_budgets = [
                {"category": "Food", "amount": 300},
                {"category": "Transport", "amount": 200},
                {"category": "Entertainment", "amount": 100}
            ]
            for b in sample_budgets:
                db.add(Budget(**b))
            db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
