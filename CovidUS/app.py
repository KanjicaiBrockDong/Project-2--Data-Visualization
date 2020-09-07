from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

ENV = 'dev'

if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///CovidUS'
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class uscases(db.Model):
    __tablename__ = 'covid_us_county'
    fips = db.Column(db.Integer, primary_key=True)
    county = db.Column(db.String(200), unique=True)
    state = db.Column(db.String(200))
    lat = db.Column(db.Integer)
    long = db.Column(db.Integer)
    cases = db.Column(db.Integer)
    deaths = db.Column(db.Integer)
    status = db.Column(db.String(200))
    details = db.Column(db.String)

    def __init__(self, county, state, lat, long, cases, deaths):
        self.county = county
        self.state = state
        self.cases = cases
        self.deaths = deaths
        self.lat = lat
        self.long = long


@app.route('/')
def index():
    return render_template('dashboard.html')


@app.route('/dataentry', methods=['POST'])
def dataentry():
    if request.method == 'POST':
        state = request.form['state']
        county = request.form['county']
        status = request.form['status']
        details = request.form['deaths']
        return render_template('dataentry.html', message='new case successfully entered')


if __name__ == '__main__':
    app.run()
