from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import engine, Base

from app.models.user import User
from app.models.task import Task

from app.api.auth import router as auth_router
from app.api.tasks import router as task_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)
app.include_router(auth_router)
app.include_router(task_router)


@app.get("/")
def root():
    return {"message": "TaskForge Backend Running"}