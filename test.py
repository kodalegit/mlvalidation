import pickle
import pandas as pd
from sklearn.metrics import mean_squared_error



df = pd.read_csv('Concrete_Data.csv')

print(df.columns)

x = df.drop('strength', axis=1)
y = df['strength']

with open('xgb.pkl', 'rb') as m:
    model = pickle.load(m)


print('Accuracy(R-squared): ', model.score(x, y))
print('Mean Squared Error: ', mean_squared_error(y, model.predict(x)))
