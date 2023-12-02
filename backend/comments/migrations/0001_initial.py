# Generated by Django 4.1.12 on 2023-12-02 13:27

from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CommentsCache',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('paper_id', models.CharField(max_length=255)),
                ('user', models.CharField(max_length=255)),
                ('text', models.TextField()),
                ('keyword', models.CharField(max_length=255)),
                ('paperTitle', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'comment_paper_db',
            },
        ),
    ]
