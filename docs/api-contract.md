# API Contract: AI-тьютор для Synergy LMS (MVP)

Все endpoint’ы работают по HTTPS.  
Формат запросов/ответов: `application/json`.  
Аутентификация: временный `userId` (генерируется расширением при первом запуске).  
**Важно**: никакие персональные данные (ФИО, email, группа) не передаются.

---

### 1. Получить структуру обучения студента

**Endpoint**: `GET /user/{userId}/subjects`  
**Описание**: Возвращает список дисциплин и тем, как они отображаются в LMS (на основе данных, собранных расширением).  
**Запрос**: —  
**Ответ (200)**:
```json
{
  "subjects": [
    {
      "id": "subj_123",
      "title": "Маркетинг",
      "deadline": "2026-05-30",
      "topics": [
        { "id": "top_001", "title": "Основы маркетинга", "completed": true },
        { "id": "top_002", "title": "Целевая аудитория", "completed": false }
      ]
    }
  ]
}
```
**Ответ (404)**:
```json
{ "error": "User not found" }
```

### 2. Сохранить прогресс по темам

**Endpoint**: `POST /user/{userId}/progress`  
**Описание**: Расширение отправляет обновлённый статус тем.  
**Тело запроса**:
```json
{
  "subjectId": "subj_123",
  "completedTopics": ["top_001", "top_002"]
}
```
**Ответ (200)**: 
```json
{ "status": "ok" }
``` 
**Ответ (400)**: 
```json
{ "error": "Invalid topic ID" }  
```
### 3. Сгенерировать персональный план обучения

**Endpoint**: `POST /user/{userId}/plan/generate`  
**Описание**: Генерация учебного плана на основе доступного времени.  
**Тело запроса**:
```json
{
  "hoursPerWeek": 6,
  "excludeDays": ["saturday", "sunday"]
}
```
**Ответ (200)**:
```json
{
  "plan": [
    {
      "date": "2026-02-03",
      "tasks": [
        { "subjectId": "subj_123", "topicId": "top_002", "title": "Целевая аудитория" }
      ]
    }
  ],
  "forecast": { "onTrack": true, "message": "Вы успеваете!" }
}
```
**Ответ (400)**: 
```json
{ "error": "hoursPerWeek must be > 0" }
```
### 4. Получить мини-квиз по теме

**Endpoint**: `GET /quiz?subjectId=subj_123&topicId=top_002`  
**Описание**: Генерация 3–5 вопросов на понимание темы.  
**Ответ (200)**:
```json
{
  "questions": [
    {
      "id": "q1",
      "text": "Что такое ЦА?",
      "type": "open", // или "multiple_choice"
      "options": null // или ["A", "B", "C"]
    }
  ]
}
```
**Ответ (404)**: 
```json
{ "error": "Topic not found" }
```
> ⚠️ Важно: вопросы НЕ повторяют реальные тесты LMS. Только обучающие.





