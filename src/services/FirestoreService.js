import db from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  doc,
  orderBy,
  limit,
} from "firebase/firestore/lite";

class FirestoreService {
  constructor() {
    this.ordersCollection = collection(db, "orders");
  }

  async get(status) {
    try {
      const q = query(this.ordersCollection, where("status", "==", status));
      const orderSnapshot = await getDocs(q);
      const orderList = orderSnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      orderList.sort((a, b) => b.orderNumber - a.orderNumber);
      return orderList;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async post(data) {
    try {
      await addDoc(this.ordersCollection, data);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async updateStatus(orderNumber, newStatus) {
    try {
      if (newStatus === null) return;
      const q = query(
        this.ordersCollection,
        where("orderNumber", "==", orderNumber)
      );

      const orderSnapshot = await getDocs(q);
      if (orderSnapshot.empty) {
        console.log("No documents found with the given orderNumber.");
        return false;
      }

      const orderDoc = orderSnapshot.docs[0];
      const orderRef = doc(this.ordersCollection, orderDoc.id);

      await updateDoc(orderRef, { status: newStatus });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  async getOrderCountByStatus(status) {
    try {
      const q = query(this.ordersCollection, where("status", "==", status));
      const orderSnapshot = await getDocs(q);
      return orderSnapshot.size;
    } catch (err) {
      console.error(err);
      return -1;
    }
  }

  async getAllStatusCounts() {
    try {
      const statusList = [
        "accepted",
        "cooking",
        "parcelready",
        "delivered",
        "completed",
      ];

      const countPromises = statusList.map(async (status) => {
        const count = await this.getOrderCountByStatus(status);
        return count;
      });

      const statusCountsArray = await Promise.all(countPromises);

      return statusCountsArray;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  static async getLastOrderNum() {
    const ordersCollection = collection(db, "orders");
    const q = query(ordersCollection, orderBy("orderNumber", "desc"), limit(1));
    const orderNumberSnapshot = await getDocs(q);

    const firstDocument = orderNumberSnapshot.docs[0];
    if (!firstDocument) {
      console.log("No documents found.");
      return 1; 
    }

    const lastOrder = firstDocument.data();
    const newOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;
    return newOrderNumber;
  }
}

export default FirestoreService;