#!/bin/bash
vagrant up
vagrant ssh -c "/env/bin/python /vagrant/src/manage.py runserver 0.0.0.0:8000"