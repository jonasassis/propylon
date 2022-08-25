# Welcome
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

## Run coverage

-   Run coverage and see report (Execute with virtualenv activated)
    ```
    cd backend
    coverage run .\manage.py test
    coverage report -m
    ```
    
-   Results coverage
    ```
    Name                              Stmts   Miss  Cover   Missing
        ---------------------------------------------------------------
        backend\__init__.py                   0      0   100%
        backend\settings.py                  27      0   100%
        backend\urls.py                      10      0   100%
        base\__init__.py                      0      0   100%
        base\admin.py                         3      0   100%
        base\apps.py                          4      0   100%
        base\migrations\0001_initial.py       8      0   100%
        base\migrations\__init__.py           0      0   100%
        base\models.py                       23      0   100%
        base\serializers.py                  34      0   100%
        base\tests.py                        54      0   100%
        base\urls\file_urls.py                3      0   100%
        base\urls\user_urls.py                3      0   100%
        base\views\files_views.py            51      0   100%
        base\views\users_views.py            36      0   100%
        ---------------------------------------------------------------
        TOTAL                               256      0   100%
    ```
