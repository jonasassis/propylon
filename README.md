# Welcome

Project web application that allows users to store, at later retrieve, files at a specified URL. In this document, you can find details about **INSTALL INSTRUCTIONS** and **API documentation**.

- [Install and run locally windows via powershell](README.md#install-and-run-locally-windows-via-powershell)
- [Install and run locally Linux](README.md#install-and-run-locally-linux)
- [Run coverage](README.md#run-coverage)

#### BACKEND (django react)
- [ **Doc Swagger** ] - http://127.0.0.1:8000/
- [ **Doc redoc** ] - http://127.0.0.1:8000/redoc
- [ **Admin** ] - http://127.0.0.1:8000/admin/

#### FRONTEND (react js)
- [ **Initial** ] - http://localhost:3000
- [ **Login** ] - http://localhost:3000/login
- [ **Register** ] - http://localhost:3000/register
- [ **Files** ] - http://localhost:3000/
- [ **Your files** ] - http://localhost:3000/file/<id-file>

## Install and run locally windows via powershell

-   Create python3 virtual environment and activate it after clone project
    ```
    cd propylon
    virtualenv myenv
    .\myenv\Scripts\activate
    ```
    
-   Install requirements
    ```
    pip install -r requirements.txt
    ```
-   Run development server
    ```
    cd backend
    python manage.py runserver
    ```

-   Install react modules
    ```
    cd frontend
    npm install
    npm start
    ```
    
## Install and run locally Linux

-   Create python3 virtual environment and activate it after clone project
    ```
    cd propylon
    python3 -m venv myenv
    source myenv/bin/activate
    ```
    
-   Install requirements
    ```
    pip install -r requirements.txt
    ```
-   Run development server
    ```
    cd backend
    python manage.py runserver
    ```

-   Install react modules
    ```
    cd frontend
    sudo apt-get update
    sudo apt-get install npm
    npm install
    npm start
    ```

## Run coverage

-   Run coverage and see report (Execute with virtualenv activated)
    ```
    cd backend
    coverage run manage.py test
    coverage report
    ```
    
-   Results coverage
    ```
    Name                        Stmts   Miss  Cover
    -----------------------------------------------
    backend/__init__.py             0      0   100%
    backend/settings.py            27      0   100%
    backend/urls.py                10      0   100%
    base/__init__.py                0      0   100%
    base/admin.py                   3      0   100%
    base/apps.py                    4      0   100%
    base/models.py                 23      0   100%
    base/serializers.py            34      0   100%
    base/tests.py                  54      0   100%
    base/urls/file_urls.py          3      0   100%
    base/urls/user_urls.py          3      0   100%
    base/views/files_views.py      51      0   100%
    base/views/users_views.py      36      0   100%
    -----------------------------------------------
    TOTAL                         248      0   100%
    ```
