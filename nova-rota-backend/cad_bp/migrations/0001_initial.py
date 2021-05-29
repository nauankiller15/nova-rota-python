# Generated by Django 3.2.3 on 2021-05-28 00:39

from django.db import migrations, models
import django.db.models.deletion
import localflavor.br.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cad_at', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Parentesco',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CPF', localflavor.br.models.BRCPFField(max_length=14, unique=True, verbose_name='Número CPF')),
                ('cod_empresa', models.CharField(max_length=25, verbose_name='Codigo Empresa')),
                ('carteirinha', models.CharField(max_length=35, verbose_name='Numero da Carteirinha')),
                ('data_recebimento', models.DateField(verbose_name='Data Recebimento')),
                ('tipo', models.CharField(default='Inclusão de Parentesco', editable=False, max_length=25, verbose_name='Tipo Cadastro')),
                ('nome_dependente', models.CharField(max_length=255, verbose_name='Nome Dependente')),
                ('data_nascimento', models.DateField(verbose_name='Data Nascimento')),
                ('data_casamento', models.DateField(blank=True, null=True, verbose_name='Data Casamento')),
                ('sexo', models.CharField(blank=True, choices=[('Masculino', 'Masculino'), ('Feminino', 'Feminino')], default='Selecione', max_length=25)),
                ('estado_civil', models.CharField(choices=[('Solteiro(a)', 'Solteiro(a)'), ('Casado(a)', 'Casado(a)'), ('Convivente', 'Convivente')], default='Selecione', max_length=25)),
                ('tipo_parentesco', models.CharField(choices=[('Filho(a)', 'Filho(a)'), ('Conjuge', 'Conjuge')], default='Selecione', max_length=25)),
                ('anexo_doc_parentesco', models.ImageField(blank=True, null=True, upload_to='anexo_parentescos')),
                ('anexo_doc_casamento', models.ImageField(blank=True, null=True, upload_to='anexo_parentesco_casamento')),
                ('nome_mae', models.CharField(max_length=255, verbose_name='Nome da Mae')),
                ('data_admissao', models.DateField(verbose_name='Data de Admissão')),
                ('CEP', localflavor.br.models.BRPostalCodeField(max_length=9, verbose_name='Código Postal')),
                ('celular', models.CharField(max_length=100, null=True, verbose_name='Numero do Celular')),
                ('cidade', models.CharField(max_length=150, verbose_name='Cidade')),
                ('estado', localflavor.br.models.BRStateField(max_length=2, verbose_name='Estado UF')),
                ('declaracao_saude', models.CharField(max_length=255, verbose_name='Declaracao Saude')),
                ('status', models.CharField(default='OK', editable=False, max_length=25, verbose_name='Status')),
                ('desc_declarao_saude', models.CharField(max_length=255, verbose_name='Desc. Declaracao Saude')),
                ('observacoes', models.TextField(blank=True, null=True, verbose_name='Obs.')),
                ('criado_em', models.DateTimeField(auto_now_add=True, verbose_name='Criado em')),
                ('atualizado_em', models.DateTimeField(auto_now=True, verbose_name='Atualizado em')),
                ('titular', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cad_at.titular')),
            ],
        ),
    ]
