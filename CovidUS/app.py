from flask import Flask, render_template, request, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy
import json
import collections
import psycopg2

app = Flask(__name__)

ENV = 'dev'

if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root123@localhost/CovidUS'
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Covid(db.Model):
    __tablename__ = 'county_us'
    fips = db.Column(db.Integer, primary_key=True)
    county = db.Column(db.String(200), unique=True)
    state = db.Column(db.String(200))
    lat = db.Column(db.Float)
    long = db.Column(db.Float)
    cases = db.Column(db.Integer)
    deaths = db.Column(db.Integer)
    status = db.Column(db.String(200))
    details = db.Column(db.String)

    def __county__(self, county, state, lat, long, cases, deaths):
        self.county = county
        self.state = state
        self.cases = cases
        self.deaths = deaths
        self.lat = lat
        self.long = long


class CovidDemo(db.Model):
    __tablename__ = 'demographic_us'
    fips = db.Column(db.Integer, primary_key=True)
    county = db.Column(db.String(200), unique=True)
    state = db.Column(db.String(200))
    lat = db.Column(db.Float)
    long = db.Column(db.Float)
    male = db.Column(db.Integer)
    female = db.Column(db.Integer)
    population = db.Column(db.Integer)

    def __demographic__(self, county, state, lat, long, male, female, population):
        self.county = county
        self.state = state
        self.male = male
        self.female = female
        self.lat = lat
        self.long = long
        self.population = population


@app.route('/')
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


@app.route('/dataentry', methods=["GET", 'POST'])
def dataentry():
    if request.method == 'POST':
        state = request.form['state']
        county = request.form['county']
        status = request.form['status']
        details = request.form['deaths']
    return render_template('dataentry.html')


@app.route('/dbscrape', methods=["GET", 'POST'])
def dbscrape():
    results = db.session.query(
        Covid.state, Covid.county, Covid.lat, Covid.long, Covid.cases, Covid.deaths).all()


    covid_data = []
    for result in results:
      d = collections.OrderedDict()
      d["state"] = result[0]
      d["county"] = result[1]
      d["lat"] = result[2]
      d["long"] = result[3]
      d["cases"] = result[4]
      d["deaths"] = result[5]
      covid_data.append(d)
    covid_json = json.dumps(covid_data)
    with open("static/js/covid_data.js", "w") as f:
       f.write(covid_json)
    # state = [result[0] for result in results]
    # county = [result[1] for result in results]
    # lat = [result[2] for result in results]
    # long = [result[3] for result in results]
    # cases = [result[4] for result in results]
    # deaths = [result[5] for result in results]

    # covid_data = [{
    # "0_state": state,
    # "1_county": county,
    # "2_lat": lat,
    # "3_long": long,
    # "4_cases": cases,
    # "5_deaths": deaths
    # }]

# print(covid_data)
    return jsonify(covid_data)


# dbscrape()
if __name__ == '__main__':
    app.run()
