# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='icon',
            field=models.ImageField(upload_to=b'images/icons'),
        ),
        migrations.AlterField(
            model_name='item',
            name='photo',
            field=models.ImageField(upload_to=b'images/photos'),
        ),
    ]
