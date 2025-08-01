from database import Base
from sqlalchemy import Column, Integer, String, Float, Date

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    description = Column(String)
    type = Column(String, nullable=False)  # "income" or "expense"
    category = Column(String)
    date = Column(Date, nullable=False)

class Budget(Base):
    __tablename__ = "budgets"
    
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, unique=True)
    amount = Column(Float, nullable=False)