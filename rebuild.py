from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error
from xgboost import XGBRegressor
import pandas as pd

# Rebuild pickled model to test accuracy

df = pd.read_csv('Concrete_Data.csv')

x = df.drop('strength', axis=1)
y = df['strength']

rng = 7

# use XGBoost to train model
clf = make_pipeline(StandardScaler(), XGBRegressor(n_estimators=620, subsample=1, max_depth=5, learning_rate=0.11, random_state=rng))

# Hold-out method for training and testing tests
X_train, X_test, y_train, y_test = train_test_split(x, y, random_state=rng)
clf.fit(X_train, y_train)

print('Accuracy: ', clf.score(X_test, y_test))
print('Mean Squared Error: ', mean_squared_error(y_test, clf.predict(X_test)))

# # k-fold cross validation method for model training
# scores = cross_val_score(clf, x, y, cv=10)

# print(f'Mean accuracy: {scores.mean(): .2f}+/-{scores.std():.2f}')