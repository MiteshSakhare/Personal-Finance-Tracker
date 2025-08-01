from pydantic import BaseModel, ConfigDict
from datetime import date

class TransactionCreate(BaseModel):
    amount: float
    description: str
    type: str
    category: str
    date: date

class Transaction(TransactionCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)  # Fix for Pydantic V2

class BudgetCreate(BaseModel):
    category: str
    amount: float

class Budget(BudgetCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)  # Fix for Pydantic V2