import csv
import random
import requests

BASE_URL = "http://localhost:3000/api"
CSV_PATH = "../source-code/backend/csv2db/players_21.csv"

with open(CSV_PATH, encoding="utf-8") as f:
    reader = csv.DictReader(f)
    csv_data = list(reader)

def print_url(url, params=None):
    req = requests.Request('GET', url, params=params).prepare()
    print(f"testando: {req.url}")

def test_list_all_players():
    url = f"{BASE_URL}/players"
    params = {"items": 5, "page": 0}
    print_url(url, params)
    
    response = requests.get(url, params=params)
    assert response.status_code == 200
    
    data = response.json()
    assert "data" in data
    assert "totalCount" in data
    assert len(data["data"]) > 0

def test_search_players_by_name():
    player = random.choice(csv_data)
    name = player["long_name"].split()[0]
    
    url = f"{BASE_URL}/players/search"
    params = {"items": 4, "page": 0, "name": name}
    print_url(url, params)
    
    response = requests.get(url, params=params)
    assert response.status_code == 200
    
    players = response.json()["data"]
    found = False
    for p in players:
        if name in p["long_name"]:
            found = True
    assert found

def test_search_by_team():
    team = random.choice(csv_data)["club_name"]
    
    url = f"{BASE_URL}/players/search"
    params = {"items": 4, "page": 0, "club": team}
    print_url(url, params)
    
    response = requests.get(url, params=params)
    assert response.status_code == 200
    
    players = response.json()["data"]
    assert len(players) > 0
    
    for player in players:
        assert player["club_name"] == team

def test_search_by_league():
    league = random.choice(csv_data)["league_name"]
    
    url = f"{BASE_URL}/players/search"
    params = {"items": 4, "page": 0, "league": league}
    print_url(url, params)
    
    response = requests.get(url, params=params)
    assert response.status_code == 200
    
    players = response.json()["data"]
    assert len(players) > 0
    
    for player in players:
        assert player["league_name"] == league

def test_search_by_nationality():
    nationality = random.choice(csv_data)["nationality"]
    
    url = f"{BASE_URL}/players/search"
    params = {"items": 4, "page": 0, "nationality": nationality}
    print_url(url, params)
    
    response = requests.get(url, params=params)
    assert response.status_code == 200
    
    players = response.json()["data"]
    assert len(players) > 0
    
    for player in players:
        assert player["nationality"] == nationality

def test_search_by_position():
    player = random.choice(csv_data)
    positions = player["player_positions"].split(", ")
    position = random.choice(positions)
    
    url = f"{BASE_URL}/players/search"
    params = {"items": 4, "page": 0, "position": position}
    print_url(url, params)
    
    response = requests.get(url, params=params)
    assert response.status_code == 200
    
    players = response.json()["data"]
    assert len(players) > 0
    
    for player in players:
        assert position in player["player_positions"]

def test_player_details():
    player_id = random.choice(csv_data)["sofifa_id"]
    
    url = f"{BASE_URL}/players/{player_id}"
    print_url(url)
    
    response = requests.get(url)
    assert response.status_code == 200
    
    data = response.json()["data"]
    assert "long_name" in data
    assert "team" in data
    assert "league" in data
    assert "nationality" in data
    assert "positions" in data

def test_player_image():
    player_id = random.choice(csv_data)["sofifa_id"]
    
    url = f"{BASE_URL}/players/{player_id}/img"
    print_url(url)
    
    response = requests.get(url, timeout=30)
    assert response.status_code == 200
    assert response.headers["Content-Type"] == "image/jpeg"

def test_top_players_overall():
    topk = 5
    
    url = f"{BASE_URL}/players/top/{topk}/overall"
    params = {"items": 4, "page": 0}
    print_url(url, params)
    
    response = requests.get(url, params=params)
    assert response.status_code == 200
    
    players = response.json()["data"]
    assert len(players) <= topk

def test_top_players_by_position():
    topk = 5
    player = random.choice(csv_data)
    position = random.choice(player["player_positions"].split(", "))
    
    url = f"{BASE_URL}/players/top/{topk}/overall"
    params = {"position": position, "items": 4, "page": 0}
    print_url(url, params)
    
    response = requests.get(url, params=params)
    assert response.status_code == 200
    
    players = response.json()["data"]
    for player in players:
        assert position in player["player_positions"]
    assert len(players) <= topk

def test_top_by_nationality():
    topk = 5
    nationality = random.choice(csv_data)["nationality"]
    
    url = f"{BASE_URL}/players/top/{topk}/overall"
    params = {"items": 4, "page": 0, "nationality": nationality}
    print_url(url, params)
    
    response = requests.get(url, params=params)
    assert response.status_code == 200
    
    players = response.json()["data"]
    for player in players:
        assert player["nationality"] == nationality
    assert len(players) <= topk

def test_top_by_league():
    topk = 5
    league = random.choice(csv_data)["league_name"]
    
    url = f"{BASE_URL}/players/top/{topk}/overall"
    params = {"league": league, "items": 4, "page": 0}
    print_url(url, params)
    
    response = requests.get(url, params=params)
    assert response.status_code == 200
    
    players = response.json()["data"]
    for player in players:
        assert player["league_name"] == league
    assert len(players) <= topk

def test_best_team():
    url = f"{BASE_URL}/team/best"
    print_url(url)
    
    response = requests.get(url)
    assert response.status_code == 200
    
    data = response.json()["data"]
    assert len(data) > 0

def test_best_team_by_league():
    league = random.choice(csv_data)["league_name"]
    
    url = f"{BASE_URL}/team/best"
    params = {"league": league}
    print_url(url, params)
    
    response = requests.get(url, params=params)
    assert response.status_code == 200
    
    data = response.json()["data"]
    for position in data.values():
        for player in position:
            assert player["league_name"] == league

def test_best_team_by_nationality():
    nationality = random.choice(csv_data)["nationality"]
    
    url = f"{BASE_URL}/team/best"
    params = {"nationality": nationality}
    print_url(url, params)
    
    response = requests.get(url, params=params)
    assert response.status_code == 200
    
    data = response.json()["data"]
    for position in data.values():
        for player in position:
            assert player["nationality"] == nationality

if __name__ == "__main__":
    test_list_all_players()
    test_search_players_by_name()
    test_search_by_team()
    test_search_by_league()
    test_search_by_nationality()
    test_search_by_position()
    test_player_details()
    test_player_image()
    test_top_players_overall()
    test_top_players_by_position()
    test_top_by_nationality()
    test_top_by_league()
    test_best_team()
    test_best_team_by_league()
    test_best_team_by_nationality()
    print("testes finalizados")