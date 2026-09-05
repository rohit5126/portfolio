FROM python:3.12-slim AS build

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

#stage 2

FROM python:3.12-alpine

WORKDIR /app

COPY --from=build /install /usr/local

COPY . .

RUN addgroup -S app && \
    adduser -S -G app app && \
    chown -R app:app /app

USER app

EXPOSE 5000

CMD ["sh", "-c", "python scripts/import_github.py && python scripts/import_json_data.py && python app.py"]