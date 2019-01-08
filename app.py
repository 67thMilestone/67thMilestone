from flask import Flask, render_template, redirect, url_for, request
from flaskext.mysql import MySQL

mysql = MySQL()
app = Flask(__name__)
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'chaekill'
app.config['MYSQL_DATABASE_DB'] = 'festdetails'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)


def decode_selected_event(selected_event):
    if selected_event == "1":
        return "Fine Arts Marathon"
    elif selected_event == "2":
        return "online photography contest"
    elif selected_event == "3":
        return "master chef'19"
    elif selected_event == "4":
        return "hackbmu"
    elif selected_event == "5":
        return "sci-ex exhibit"
    elif selected_event == "6":
        return "encrypt"
    elif selected_event == "7":
         return "halls of summer"
    elif selected_event == "8":
         return "inquizitive"
    elif selected_event == "9":
         return "slam poetry"
    elif selected_event == "10":
         return "battle of bands"
    elif selected_event == "11":
         return "beat the street"
    elif selected_event == '12':
         return "rihaai - nukkad"
    elif selected_event == '13':
         return "unplugged"
    elif selected_event == '14':
         return "bailar"
    elif selected_event == '15':
         return "rc nitro"
    elif selected_event == '16':
         return "line follower"
    elif selected_event == '17':
         return "aerial drones"
    elif selected_event == '18':
         return "robo race"
    elif selected_event == '19':    
         return "robo soccer"
    elif selected_event == '20':
         return "robo war"
    elif selected_event == '21':
         return "theatre phantamonica"
    elif selected_event == '22':
         return "war of djs"
    elif selected_event == '23':
         return "spic macay"
    elif selected_event == '24':
         return "fashion crave"
    else:
         return "model united nations"                           

@app.route('/')
def home():
    return render_template('homePage.html')

@app.route('/homePage.html')
def index():
    return render_template('homepPage.html')

@app.route('/events.html')
def courses():
    return render_template('events.html')

@app.route('/signup.html', methods=['GET', 'POST'])
def signup():
    print("1")
    if request.method == 'POST':
        conn = mysql.connect()
        print("Hellow")
        name = request.form['username']
        university = request.form['university']
        email = request.form['email']
        participants = request.form['no_par']
        selected_event = request.form['selected']
        event = decode_selected_event(selected_event)
        c = conn.cursor()
        c.execute("INSERT INTO details (name, university, email, participants, event) VALUES (%s, %s, %s, %s, %s)", (name, university, email, participants, event))
        conn.commit()
        c.close()
        conn.close()

        return render_template('events.html')

    return render_template('signup.html')

@app.route('/signin.html', methods=['GET', 'POST'])
def signin():
    error = None
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        cursor = mysql.connect().cursor()
        cursor.execute("SELECT * from User where email='" + email + "' and password='" + password + "'")
        data = cursor.fetchone()
        if data is None:
         error = 'Invalid Credentials. Please try again.'        
        else:
         return redirect(url_for('courses'))
    return render_template('signin.html', error=error)  


if __name__ == '__main__':
    app.run(host="10.7.6.85", port=5000)
    app.debug = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    # app.jinja_env.auto_reload = True
