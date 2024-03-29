# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=64)),
                ('icon', models.ImageField(upload_to=b'icon')),
                ('photo', models.ImageField(upload_to=b'photo')),
                ('audio', models.FileField(upload_to=b'audio')),
                ('price', models.PositiveIntegerField()),
                ('likely_to_draw', models.PositiveIntegerField()),
            ],
        ),
    ]
