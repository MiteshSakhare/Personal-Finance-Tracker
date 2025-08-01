from sqlalchemy.orm import Session
from models import Transaction, Budget
from schemas import TransactionCreate, BudgetCreate

def create_transaction(db: Session, transaction: TransactionCreate):
    db_transaction = Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def get_transactions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Transaction).offset(skip).limit(limit).all()

def create_budget(db: Session, budget: BudgetCreate):
    db_budget = Budget(**budget.dict())
    db.add(db_budget)
    db.commit()
    db.refresh(db_budget)
    return db_budget

def get_budgets(db: Session):
    return db.query(Budget).all()

def get_summary(db: Session):
    transactions = db.query(Transaction).all()
    income = sum(t.amount for t in transactions if t.type == "income")
    expenses = sum(t.amount for t in transactions if t.type == "expense")
    return {
        "total_income": income,
        "total_expenses": expenses,
        "net_balance": income - expenses
    }