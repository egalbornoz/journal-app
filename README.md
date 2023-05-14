# Paso para usar git

    git add archivo1.txt archivo2.txt ...       --> Especificar archivos a seleccionar
    git commit -m "Nombre del commit"           --> Compromete cambios
    git rm archivo1.txt                         --> Commit a archivo eliminado
    git restore archivo.txt                     --> Restaura un archivo eliminado que no se ha hecho commit
    se crea un archivo .gitignore               --> Ignorar archivos y no subir al git
    git status -s                               --> Forma eficiente de ver el status
    git diff                                    --> Visualizar los cambios del(los) archivo(s) a comprometer
    git diff --staged                           --> Ver cambios que se encuentran en la etapa de satge
    git log                                     --> Revisar el historial del repositorio
    git log --oneline                           --> Revisar el historial del repositorio resumen
    git restore --staged                        -->  Restaurar un archivo del staged

Pasos para crear una rama

git branch --> Ver en que rama nos encontramos
git checkout -b nombre_rama --> Crear una nueva rama
cat nombre archivo --> Muestra el contenido de un archivo

Para hacer el merge hay que cambiarse a la rama main

git checkout main --> Cambiamos a la rama main
git merge rama(nombre rama a hacer merge) --> Hacer merge con la rama deseada

SUBIR CAMBIOS A LA NUBE

1. Crear una cuenta en GitHub
2. Crear un repositorio

3. git remote add origin https://github.com/nombre_repositorio.git (Ruta generada por github)
4. git push -u origin main --> Sube el codigo al reporitorio en la nube (primera vez) -u indica que va a crear la rama main en el remoto

5. git push --> Agregar codigo al repositorio remoto.

6. Si quieres
