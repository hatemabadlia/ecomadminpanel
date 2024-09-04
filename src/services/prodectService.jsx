    import { db } from './firebaseconfig';
    import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

    const productCollectionRef = collection(db, 'products');

    export const getProducts = async () => {
    const data = await getDocs(productCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    };

    export const addProduct = async (product) => {
    await addDoc(productCollectionRef, product);
    };

    export const updateProduct = async (id, updatedProduct) => {
    const productDoc = doc(db, 'products', id);
    await updateDoc(productDoc, updatedProduct);
    };

    export const deleteProduct = async (id) => {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
    };