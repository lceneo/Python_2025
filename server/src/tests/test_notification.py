# tests/test_simple_notifications.py
import pytest
from fastapi.testclient import TestClient
from unittest.mock import Mock, AsyncMock

from ..auth.middlewares.get_user_id_from_token import get_user_id_from_token
from ..database.database import get_db
from ..main import app


def test_get_notifications_simple():

    mock_user_id = Mock(return_value=1)
    mock_db = Mock()

    app.dependency_overrides[get_user_id_from_token] = mock_user_id
    app.dependency_overrides[get_db] = lambda: mock_db


    from ..notifications.service import get_user_notifications
    original_function = get_user_notifications
    get_user_notifications = Mock(return_value=[])

    client = TestClient(app)
    response = client.get("/notifications/get")

    assert response.status_code == 200
    assert response.json() == []

    # Восстанавливаем оригинальную функцию
    get_user_notifications = original_function
    app.dependency_overrides.clear()



def test_create_notification_simple():

    app.dependency_overrides[get_user_id_from_token] = lambda: 1
    app.dependency_overrides[get_db] = lambda: Mock()

    from ..notifications.service import create_user_notification
    mock_response = {"id": 1, "title": "Test", "message": "Test message"}
    create_user_notification = Mock(return_value=mock_response)

    client = TestClient(app)
    response = client.post(
        "/notifications/create",
        json={
            "title": "Test",
            "message": "Test message",
            "notification_type": "info"
        }
    )

    assert response.status_code == 200
    assert response.json()["title"] == "Test"

    app.dependency_overrides.clear()