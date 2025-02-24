#!/bin/bash

# Solicita os dados do usuário
read -p "Digite o nome do usuário: " nome
read -p "Digite o email: " email
read -p "Digite a senha: " senha
read -p "Digite o endereço: " endereco

# Monta o JSON dinâmico
json_data=$(cat <<EOF
{
    "nome": "$nome",
    "email": "$email",
    "senha": "$senha",
    "endereco": "$endereco"
}
EOF
)

# Executa o curl com os dados preenchidos
echo "=================================="
curl -X POST --location 'http://localhost:3000/usuarios' \
--header 'Content-Type: application/json' \
--data-raw "$json_data"
echo "\n=================================="

