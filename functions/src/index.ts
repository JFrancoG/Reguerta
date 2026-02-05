import {setGlobalOptions} from "firebase-functions/v2";
import {onRequest} from "firebase-functions/v2/https";
import {logger, config} from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

setGlobalOptions({
  region: "europe-west1",
  concurrency: 1,
  cpu: 1,
  memory: "256MiB",
  timeoutSeconds: 60,
});

let ENV = "develop";
try {
  ENV = config().app?.env || "develop";
} catch {
  ENV = "develop";
}

const updateTimestamp = async (env: string, collectionName: string) => {
  const now = admin.firestore.Timestamp.now();
  await admin.firestore()
    .collection(`${env}/collections/config`)
    .doc("global")
    .set({
      lastTimestamps: {
        [collectionName]: now,
      },
    }, {merge: true});
};

/*
export const onProductWrite = defineFunction({
  region: "europe-west1",
  trigger: {
    eventTrigger: {
      eventType: "google.cloud.firestore.document.v1.written",
      eventFilters: [
        {
          attribute: "document",
          value: "products/{productId}",
          operator: "match-path-pattern",
        },
      ],
      triggerRegion: "europe-west1",
    },
  },
}, async (event: FirestoreEvent<unknown>) => {
  logger.info(`🟢 Trigger FIXED: productId = ${event.params.productId}`);
  await updateTimestamp("products");
});
*/

export const onProductWrite = onRequest(async (req, res) => {
  const env = (req.query.env as string) || ENV;
  const collectionName = (req.query.collectionName ?? "products") as string;
  await updateTimestamp(env, collectionName);
  logger.info(
    `🟢 HTTP timestamp updated for: ${collectionName}, env: ${env}`
  );
  res.status(200).send(`Timestamp updated for: ${collectionName}, env: ${env}`);
});

/*
export const onOrderlineWrite = onDocumentWritten(
  "orderlines/{orderlineId}",
  async () => {
    await updateTimestamp("orderlines");
  }
);

export const onContainerWrite = onDocumentWritten(
  "containers/{containerId}",
  async () => {
    await updateTimestamp("containers");
  }
);

export const onMeasureWrite = onDocumentWritten(
  "measures/{measureId}",
  async () => {
    await updateTimestamp("measures");
  }
);

export const onOrderWrite = onDocumentWritten(
  "orders/{orderId}",
  async () => {
    await updateTimestamp("orders");
  }
);
*/


export const onContainerWrite = onRequest(async (req, res) => {
  const env = (req.query.env as string) || ENV;
  await updateTimestamp(env, "containers");
  logger.info(`🟢 HTTP timestamp updated for: containers, env: ${env}`);
  res.status(200).send(`Timestamp updated for: containers, env: ${env}`);
});

export const onMeasureWrite = onRequest(async (req, res) => {
  const env = (req.query.env as string) || ENV;
  await updateTimestamp(env, "measures");
  logger.info(`🟢 HTTP timestamp updated for: measures, env: ${env}`);
  res.status(200).send(`Timestamp updated for: measures, env: ${env}`);
});


/*
export const onUserWrite = onDocumentWritten(
  "users/{userId}",
  async () => {
    await updateTimestamp("users");
  }
);
*/

export const onUserWrite = onRequest(async (req, res) => {
  const env = (req.query.env as string) || ENV;
  await updateTimestamp(env, "users");
  logger.info(`🟢 HTTP timestamp updated for: users in env: ${env}`);
  res.status(200).send(`Timestamp updated for: users in env: ${env}`);
});

export const onOrderWrite = onRequest(async (req, res) => {
  const env = (req.query.env as string) || ENV;
  await updateTimestamp(env, "orders");
  logger.info(`🟢 HTTP timestamp updated for: orders in env: ${env}`);
  res.status(200).send(`Timestamp updated for: orders in env: ${env}`);
});


export const cloneGlobalConfig = onRequest(async (_req, res) => {
  const sourceDoc = admin.firestore()
    .collection("develop/collections/config")
    .doc("global");

  const targetDoc = admin.firestore()
    .collection("production/collections/config")
    .doc("global");

  const baseTimestamp = admin.firestore.Timestamp.fromDate(
    new Date("2025-01-01T00:00:00Z")
  );

  const snapshot = await sourceDoc.get();

  if (!snapshot.exists) {
    res.status(404).send("⚠️ Source config/global (develop) does not exist");
    return;
  }

  const data = snapshot.data();
  if (!data) {
    res.status(500).send("❌ No data found in source document");
    return;
  }

  const overridden = {
    ...data,
    lastTimestamps: {
      products: baseTimestamp,
      containers: baseTimestamp,
      measures: baseTimestamp,
      orders: baseTimestamp,
      orderlines: baseTimestamp,
      users: baseTimestamp,
    },
  };

  await targetDoc.set(overridden, {merge: true});

  logger.info("✅ config/global copied to prod");
  res.status(200).send("✅ config/global copied");
});
