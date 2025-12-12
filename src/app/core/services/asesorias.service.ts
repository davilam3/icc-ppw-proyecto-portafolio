import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AsesoriasService {
  private firestore = inject(Firestore);

  /** Solicitar una asesoría */
  async solicitarAsesoria(datos: { programadorUid: string; solicitanteUid?: string | null; fecha: string; hora: string; comentario?: string }) {
    const ref = collection(this.firestore, 'asesorias');
    const docRef = await addDoc(ref, { ...datos, estado: 'pendiente', creadoEn: new Date() });
    return { id: docRef.id };
  }

  /** Obtener solicitudes para un programador */
  async obtenerSolicitudesPorProgramador(uid: string) {
    const q = query(collection(this.firestore, 'asesorias'), where('programadorUid', '==', uid));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
  }

  async actualizarEstadoSolicitud(id: string, estado: 'aceptada' | 'rechazada' | 'pendiente', respuesta?: string) {
    await updateDoc(doc(this.firestore, 'asesorias', id), { estado, respuesta, actualizadoEn: new Date() } as any);
  }
}
