from flask import Flask, render_template, request, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy

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


@app.route('/dbscrape')
def dbscrape():
    results = db.session.query(Covid.county, Covid.lat, Covid.long).all()

    hover_text = [result[0] for result in results]
    lat = [result[1] for result in results]
    long = [result[2] for result in results]

    covid_data = [{
        "type": "scattergeo",
        "locationmode": "USA-states",
        "lat": lat,
        "long": long,
        "text": hover_text,
        "hoverinfo": "text",
        "marker": {
            "size": 15,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
        }
    }]

    return jsonify(covid_data)


if __name__ == '__main__':
    app.run()
