import os
from dotenv import load_dotenv

from backend import app

if __name__ == '__main__':
    load_dotenv()
    app.run(
        host='0.0.0.0',
        debug=os.environ.get('DEBUG', True),
        port=os.environ.get('PORT', 80)
    )