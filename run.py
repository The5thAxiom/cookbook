import os
from backend import app

app.run(
    host='0.0.0.0',
    debug=False,
    port=os.environ.get('PORT', 80)
)