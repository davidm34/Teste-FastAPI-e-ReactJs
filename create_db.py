from backend.database import engine
from backend import models

print("Criando tabelas...")
models.Base.metadata.create_all(bind=engine)
print("Tabelas criadas com sucesso!")