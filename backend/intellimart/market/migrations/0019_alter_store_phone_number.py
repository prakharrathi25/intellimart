# Generated by Django 3.2.3 on 2021-05-22 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0018_auto_20210522_2043'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='phone_number',
            field=models.CharField(default='123456789', max_length=15),
        ),
    ]