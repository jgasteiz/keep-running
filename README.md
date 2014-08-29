# Keep Running

### Disclaimer: this is in very early stage

**Keep Running is a web app to log your running activities**

How to run the thing in local:

```
virtualenv env && source ./env/bin/activate
pip install -r requirements.txt
bower install
./src/manage.py syncdb
./src/manage.py runserver
```