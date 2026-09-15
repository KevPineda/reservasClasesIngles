import React from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../theme";
import { formatearPrecio } from "../data/clases";

export default function DetalleClaseScreen({ route }) {
  const { clase } = route.params;

  return (
    <View style={styles.pantalla}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: clase.imagen }}
          resizeMode="cover"
          style={styles.portada}
        />
        <View style={styles.contenido}>
          <Text style={styles.titulo}>{clase.titulo}</Text>
          <Text style={styles.descripcion}>{clase.descripcion}</Text>

          <View style={styles.profesorFila}>
            <Image
              source={{ uri: clase.profesor.foto }}
              style={styles.fotoProfesor}
            />

            <View>
              <Text style={styles.profesorNombre}>{clase.profesor.nombre}</Text>
              <Text style={styles.profesorPais}>{clase.profesor.pais}</Text>
            </View>
          </View>

          <Text style={styles.meta}>Modalidad: {clase.modalidad}</Text>
          <Text style={styles.meta}>Nivel: {clase.nivel}</Text>
          <Text style={styles.meta}>Duración: {clase.duracion} minutos</Text>
          <Text style={styles.meta}>Cupos disponibles: {clase.cupos}</Text>
          <Text style={styles.meta}>Rating: {clase.rating}</Text>
          <Text style={styles.precio}>
            PRECIO: {formatearPrecio(clase.precio)}
          </Text>
          <Text style={styles.subtitulo}>Horarios disponibles</Text>

          {clase.horarios.map((horario) => (
            <Text key={horario} style={styles.horario}>
              {horario}
            </Text>
          ))}

          <Pressable
            style={styles.boton}
            onPress={() =>
              Alert.alert("Reserva creada", `Reservaste: ${clase.titulo}`)
            }
          >
            <Text style={styles.textoBoton}>Reservar clase</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  portada: {
    width: "100%",
    height: 220,
    backgroundColor: colors.primarioSuave,
  },
  contenido: {
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.texto,
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 16,
    color: colors.textoSuave,
    lineHeight: 24,
  },
  meta: {
    fontSize: 15,
    color: colors.texto,
    marginTop: 10,
  },
  precio: {
    fontSize: 20,
    color: colors.primario,
    fontWeight: "800",
    marginTop: 16,
  },
  subtitulo: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.texto,
    marginTop: 20,
    marginBottom: 8,
  },
  horario: {
    fontSize: 15,
    color: colors.texto,
    backgroundColor: colors.superficie,
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  boton: {
    backgroundColor: colors.primario,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  profesorFila: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  fotoProfesor: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
    backgroundColor: colors.primarioSuave,
  },
  profesorNombre: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.texto,
  },
  profesorPais: {
    fontSize: 14,
    color: colors.textoSuave,
    marginTop: 2,
  },
});
