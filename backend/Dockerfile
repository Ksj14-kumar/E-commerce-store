FROM node:16-alpine3.16

WORKDIR /server/

COPY . /server/
ENV URI_DB=mongodb+srv://real-time:06jpFR9Hqii9Vp43@cluster0.tqlmsso.mongodb.net/?retryWrites=true&w=majority \ 
    PORT=5100 \
    NUM_VERIFY_API_KEY=edd2f9e3e78d805ae6625986739ef6cc \
    SENDER_MAIL=ksj14998@gmail.com \
    SENDER_MAIL_PASSWORD=rbbbtzrgnwwnxlcv \
    Mobile_Num_for_twilio=+12764009793 \
    TWILIO_SID=AC918641e0d27128ae76aa7b7292668c0b \
    TWILIO_TOKEN=61af78d131f4465632b84f5daa7bdbc9 \
    BACKEND_DOMAIN=http://localhost:5100 \
    STRIPE_SECRET=sk_test_51MgmJ8SEcIzPyU87hIc4BwlB8RjO7GPzmtT3csKQV0SrMTX1luRjDNmvz3W40QU8rVukFwUgyPXKM5lXarzs66GP00Mu6VeoUD \
    UI_URL=http://localhost:5173 \
    STRIPE_END_POINT_SECRET=whsec_1ed522d1951396a6e761538cfe69963f8b3431f1c249969e91454c5a9a626fd9 \
    session_secret=e750e4fe182adf9bb79a23790dafad877d5e3e74e8d3ce444662ef9a33acc08aa5b8a42959216b91df33fcf6269e311e7255ccbea3c9c090f8a369349496dd4c \
    GOOGLE_CLIENT_ID=1026640358668-4la1h2tb81ndqmidtp2qmal1tiqkatek.apps.googleusercontent.com \
    GOOGLE_CLIENT_SECRET=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 

ADD . /server/

RUN npm install
EXPOSE 5100

CMD ["npm","run","dev"]
