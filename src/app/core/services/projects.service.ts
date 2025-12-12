import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc, getDocs, query, where, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private firestore = inject(Firestore);

  /** Crea un proyecto y lo asocia a un programador (almacena ID en el documento del proyecto) */
  async crearProyecto(programadorUid: string, datos: any) {
    const ref = collection(this.firestore, 'proyectos');
    const docRef = await addDoc(ref, { ...datos, owner: programadorUid, creadoEn: new Date() });
    // opcional: agregar ID a la colección del programador (no obligatorio ahora)
    return { id: docRef.id };
  }

  async actualizarProyecto(id: string, datos: Partial<any>) {
    await updateDoc(doc(this.firestore, 'proyectos', id), datos as any);
  }

  async eliminarProyecto(id: string) {
    await deleteDoc(doc(this.firestore, 'proyectos', id));
  }

  async obtenerProyectosPorProgramador(uid: string) {
    const q = query(collection(this.firestore, 'proyectos'), where('owner', '==', uid));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
  }
}
