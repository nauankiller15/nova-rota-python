# Generated by Django 3.2.2 on 2021-05-12 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cad_at', '0006_alter_titular_data_admissao'),
    ]

    operations = [
        migrations.AlterField(
            model_name='titular',
            name='anexo_doc_tit',
            field=models.ImageField(blank=True, null=True, upload_to='titular'),
        ),
    ]
