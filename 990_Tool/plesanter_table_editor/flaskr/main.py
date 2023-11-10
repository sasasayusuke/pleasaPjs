from flaskr import app
from flask import render_template, request, redirect, url_for
import sqlite3
DATABASE = "database.db"

@app.route('/')
def index():
    con = sqlite3.connect(DATABASE)
    db_books = con.execute("SELECT * FROM books").fetchall()
    con.close()
    books = []
    for row in db_books:
        books.append({
            "title" : row[0],
            "price" : row[1],
        })
    return render_template(
        'index.html',
        bs=books
    )

@app.route("/form")
def form():
    return render_template(
        'form.html',
    )

@app.route("/register", methods=["POST"])
def register():
    title = request.form["title"]
    price = request.form["price"]

    con = sqlite3.connect(DATABASE)
    con.execute("INSERT INTO books VALUES(?, ?)", [title, price])
    con.commit()
    con.close()
    return redirect(url_for("index"))