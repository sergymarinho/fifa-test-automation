import csv
import sqlite3
from sqlite3.dbapi2 import OperationalError

# Consts
csvPath = 'players_21.csv'
dbPath = '../database.db'
tableName = 'players'

# Loading
stepCount = 1000

# Create the connection with the database


def createConnection(path):
    return sqlite3.connect(path)

# Generate the SQL to create the table, based on the fields


def generateTableSQL(table_name, tuples):
    start = "CREATE TABLE " + table_name
    fields = ''
    for tuple in tuples:
        fields += (tuple[0] + ' ' + tuple[1] + ', ')

    fields = fields[:-2]

    return start + ' (' + fields + ')'

# Generate the SQL to insert in the table, based on the fields


def generateInsertionSQL(list):
    start = "INSERT INTO " + tableName + " VALUES"
    fields = ''
    for element in list:
        if(checkType(element) == 'INTEGER'):
            fields += element + ', '
        else:
            fields += '"' + element.replace('"', '') + '", '

    fields = fields[:-2]

    return start + ' (' + fields + ')'

# Check type of field, to dynamicly insert into SQLite3


def checkType(value):
    if(value.isdigit()):
        return "INTEGER"
    else:
        return "TEXT"


def main():
    sqlConnection = createConnection(dbPath)
    sqlCursor = sqlConnection.cursor()

    currentCount = 0

    with open(csvPath, encoding="utf8") as file:
        table = csv.reader(file, delimiter=',')
        line = 0
        headers = []

        for row in table:
            # Header
            if line == 0:
                for i in range(0, len(row)):
                    headers.append(row[i])
                line += 1

            # Content below header
            else:
                # Create the TABLE
                if(line == 1):
                    tuples = []
                    for i in range(0, len(row)):
                        tuples.append((headers[i], checkType(row[i])))

                    try:
                        sqlCursor.execute(generateTableSQL(tableName, tuples))
                    except sqlite3.OperationalError:
                        print(
                            "It looks like your table already exist, ending the process")
                        return

                # Add data
                sql = generateInsertionSQL(row)
                sqlCursor.execute(sql)
                line += 1

            # Load
            if line >= currentCount + stepCount:
                currentCount = currentCount + stepCount
                print(str(currentCount) + ' lines read.')

        # Everything went OK
        sqlConnection.commit()


if __name__ == "__main__":
    main()
