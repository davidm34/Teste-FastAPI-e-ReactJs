from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend React local
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/users/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=schemas.UserResponse)
def check_user_email(login_or_register: bool, user_email: str, user_password: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user_email)
    # True = Login
    if login_or_register:
        password_verify = crud.verify_password(db, user_email, user_password)
        if password_verify is None: 
            raise HTTPException(status_code=401, detail="Senha Incorreta")      
        return db_user
    else:
        if db_user:
            raise HTTPException(status_code=409, detail="Usuário já existente no sistema")
        return JSONResponse(content={"message": "Email disponível"})

# @app.get("/users/", response_model=list[schemas.UserResponse]) # Note o `list[schemas.UserResponse]`
# def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     users = crud.get_users(db, skip=skip, limit=limit)
#     return users

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    crud.delete_user(db=db, user_id=user_id)
    return {"message": "Usuário deletado com sucesso"}



