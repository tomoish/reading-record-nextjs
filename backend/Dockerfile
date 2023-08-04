FROM python:3.10.11-slim
ENV PYTHONUNBUFFERED 1

RUN mkdir /backend
WORKDIR /backend

ADD requirements.txt /backend/
RUN pip install -r requirements.txt
