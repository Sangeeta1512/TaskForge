from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    description: str | None = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None
    completed: bool
    owner_id: int

    class Config:
        from_attributes = True

class TaskUpdate(BaseModel):
    title: str
    description: str | None = None
    completed: bool