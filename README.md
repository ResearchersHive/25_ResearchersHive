# Researchers' Hive

## Setup Instructions

### Frontend
* `cd frontend`
* `npm i --force`
* `npm run dev`
* Open [localhost:5173](http://localhost:5173) in the browser.

### Backend
* `cd backend`
* `pip install -r requirements.txt`
* Setup the PaLM API key in `.env` as per the `.env.example` file.
* `python3 manage.py migrate`
* `python3 manage.py runserver`
