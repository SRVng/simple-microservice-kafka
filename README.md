## Setup
Config your `.env` to match the parameters in `.env.example` from your cloud service provider or docker 
```
BROKER_HOST=
BROKER_PORT=
SASL_USERNAME=
SASL_PASSWORD=
SASL_MECHANISM=
SEC_PROTOCOL=
```
```
git clone https://github.com/SRVng/simple-microservice-kafka.git
cd simplpe-microservice-kafka
npm ci
npm run build
```

## Scripts
```
## inventory_prepare
npm run start:prepare
npm run start:prepare-input

## inventory_ready
npm run start:ready
```

## Description
This is part of CS621 Software Design and Architecture, Thammasat University
```mermaid
graph LR;
    Service_A{{Employee_Mgmt}}
    Service_B{{Inventory_Management}}
    Service_C{{...}}
    Service_D{{...}}
    Service_E{{...}}

    Topic_A(topic.1)
    Topic_B(inventory_request.in)
    Topic_C(inventory_request.ready)
    
    Service_A --> |React to| Topic_A
    Service_A --> |Emit to| Topic_B

    Service_B --> |React to| Topic_B
    Service_B --> |Emit to| Topic_C

    Service_C --> |React to| Topic_C
    Service_D --> |React to| Topic_C
    Service_E --> |React to| Topic_C
```