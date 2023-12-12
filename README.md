# Nestjs build microservices

- Authentication microservice
- Booking microservice
- Payment microservice
- Notification microservice

# Run the application

```bash
docker compose up
```

# Run e2e tests

```bash
yarn test:e2e
```

If modifications have been made and containers have been pushed to AWS, you must first do the following before run the tests

```bash
cd e2e && docker compose pull
```

# Run K8S infrastructure

```bash
cd k8s/sleepr
```

```bash
helm install sleepr .
```
