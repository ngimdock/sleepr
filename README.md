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

# Run K8S infrastructure

```bash
cd k8s/sleepr
```

```bash
helm install sleepr .
```
