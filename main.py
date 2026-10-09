import ast
import hashlib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeSubmission(BaseModel):
    user_id: int = 1
    task_id: int = 101
    code: str

@app.post("/submit-task")
async def submit_task(submission: CodeSubmission):
    try:
        # AST Validation
        parsed_ast = ast.parse(submission.code)
        
        has_loop = any(
            isinstance(node, (ast.For, ast.While)) 
            for node in ast.walk(parsed_ast)
        )
        
        if not has_loop:
            raise HTTPException(
                status_code=400, 
                detail="AST Verification Failed: Code me loop zaroori hai."
            )
        
        # Hash Generation
        proof_hash = hashlib.sha256(submission.code.encode()).hexdigest()
        
        return {
            "status": "success",
            "message": "AST Validation Passed!",
            "proof_hash": proof_hash
        }

    except SyntaxError:
        raise HTTPException(
            status_code=400, 
            detail="Syntax Error in Python Code"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=str(e)
        )