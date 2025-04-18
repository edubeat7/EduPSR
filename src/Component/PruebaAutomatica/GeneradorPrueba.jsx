import React from 'react';
import * as XLSX from 'xlsx';

const ExcelGenerator = () => {
  // Usamos las preguntas que ya conocemos del código previo
  const preguntas = [
    {
      texto: "1. ¿Cuál es la principal diferencia entre tendones y ligamentos en el cuerpo humano?",
      opciones: [
        "a) Los tendones no son elásticos",
        "b) Los tendones unen músculo con hueso mientras que los ligamentos unen hueso con hueso",
        "c) Los tendones se encuentran principalmente en las extremidades superiores",
        "d) Los ligamentos están compuestos principalmente por elastina"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "2. En la biomecánica del músculo, ¿qué determina la fuerza máxima que puede generar un músculo?",
      opciones: [
        "a) La longitud de las fibras musculares",
        "b) El ángulo de penación",
        "c) El área de sección transversal fisiológica",
        "d) La velocidad de contracción"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "3. Una paciente de 68 años con osteoporosis posmenopáusica avanzada presenta una disminución significativa de la densidad mineral ósea en su fémur proximal. Las imágenes de densitometría ósea muestran que la sección transversal efectiva del cuello femoral ha disminuido a un tercio de su valor normal debido a la pérdida de masa ósea. Si esta paciente aplica la misma fuerza sobre la cadera al caminar que una persona con densidad ósea normal, el esfuerzo aplicado en el área debilitada será:",
      opciones: [
        "a) El triple",
        "b) Un tercio",
        "c) No cambia",
        "d) El doble"
      ],
      respuestaCorrecta: 0,
    },
    {
      texto: "4. ¿Qué tipo de esfuerzo soportan peor los huesos?",
      opciones: [
        "a) Compresión",
        "b) Tensión",
        "c) Torsión",
        "d) Flexión"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "5. Un paciente con esguince en el tendón muestra una deformación permanente del tejido ¿En qué región de la curva esfuerzo-deformación se encuentra esta lesión?",
      opciones: [
        "a) Región basal",
        "b) Región lineal o elástica",
        "c) Región de falla progresiva o plástica",
        "d) Punto de falla total"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "6. En un músculo peniforme con ángulo de penación de 30° (medido desde la vertical), ¿qué porcentaje de la fuerza muscular contribuye directamente a la fuerza de contracción?",
      opciones: [
        "a) 100%",
        "b) 87%",
        "c) 56%",
        "d) 34%"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "7. La propiedad del hueso que hace que su comportamiento mecánico varíe según la dirección de la carga aplicada se denomina:",
      opciones: [
        "a) Viscoelasticidad",
        "b) Anisotropía",
        "c) Ductilidad",
        "d) Porosidad"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "8. Durante un procedimiento de lavado gástrico, se introduce una sonda nasogástrica a través de la fosa nasal del paciente. La distancia desde la fosa nasal hasta el estómago es de aproximadamente 80 cm. ¿En qué segmento del trayecto de la sonda nasogástrica la velocidad de avance debe ser más lenta debido a riesgos anatómicos o cambios de dirección y cuál es su velocidad media de todo el trayecto si tarda 16 s?",
      opciones: [
        "a) En la cavidad nasal, debido a la curvatura y estrechez del meato nasal inferior, V=16cm/s",
        "b) En la transición de la faringe a la hipofaringe, donde existe riesgo de introducción en la vía aérea V=5cm/s",
        "c) En el esófago cervical, debido a la compresión natural por el cartílago cricoides V=2cm/s",
        "d) En la unión gastroesofágica (cardias), donde existe un esfínter y un cambio de dirección V=8cm/s"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "9. Un neurólogo está evaluando a pacientes con diferentes grados de esclerosis múltiple, una enfermedad desmielinizante que afecta la conducción nerviosa. Realiza pruebas de conducción nerviosa en cuatro pacientes, midiendo el tiempo que tarda un potencial de acción en recorrer una distancia de 30 cm en nervios periféricos. Los resultados son los siguientes: Paciente A: 0,6 ms, Paciente B: 1,5 ms, Paciente C: 3,0 ms, Paciente D: 0,3 ms. ¿Qué paciente presenta probablemente un menor daño desmielinizante en la zona evaluada?",
      opciones: [
        "a) Paciente A",
        "b) Paciente B",
        "c) Paciente C",
        "d) Paciente D"
      ],
      respuestaCorrecta: 3,
    },
    {
      texto: "10. Un odontólogo está evaluando la resistencia de diferentes materiales para una restauración molar en un paciente con bruxismo severo. Durante la masticación, el molar soporta una fuerza oclusal máxima de 720 N. La restauración propuesta tiene una superficie oclusal con área de contacto de 24 mm². El odontólogo considera tres materiales diferentes con los siguientes límites de resistencia a la compresión: • Material A (Composite reforzado): 280 MPa • Material B (Cerámica feldespática): 160 MPa • Material C (Resina acrílica): 95 MPa. ¿Qué material es más susceptible a fracturarse bajo las condiciones de carga máxima del paciente con bruxismo?",
      opciones: [
        "a) Material A",
        "b) Material B",
        "c) Material C",
        "d) Todos los materiales resistirán la carga sin fracturarse"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "11. El freno de alambre que se ve en la figura tiene una tensión T igual a 7N a lo largo de él con un ángulo de 70 grados con el eje y. La fuerza resultante en el eje y es de:",
      opciones: [
        "A) 8,3",
        "b) 4,8",
        "c) 5,6",
        "d) 7,4"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "12. Un fisioterapeuta está desarrollando un programa de rehabilitación para un paciente con una lesión de ligamento cruzado anterior (LCA) en etapa inicial de recuperación. En esta fase, el fisioterapeuta necesita fortalecer la musculatura sin generar tensión en el ligamento lesionado, por lo que decide incluir ejercicios isométricos. ¿Qué combinación de ejercicios sería más adecuada para esta fase de rehabilitación?",
      opciones: [
        "a) Extensiones de rodilla y sentadillas profundas",
        "b) Sentadillas con salto y escalones",
        "c) Contracción sin flexo extensión del cuádriceps y ejercicio de puente glúteo estático",
        "d) Zancadas dinámicas y ejercicios con banda elástica con movimiento"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "13. Un ingeniero biomédico evalúa diferentes materiales y consideraciones biomecánicas para el diseño de una prótesis de codo. El paciente es un hombre de 58 años con artritis reumatoide avanzada que requiere una artroplastia total. ¿Cuál de las siguientes opciones describe correctamente los materiales más adecuados para una prótesis de codo moderna, los criterios de selección y las fuerzas biomecánicas relevantes?",
      opciones: [
        "a) Material: Polietileno de ultra alto peso molecular, Criterio principal: biocompatibilidad, Fuerzas predominantes: compresión en el pasador articular",
        "b) Material: Aleación de titanio para el componente humeral y polietileno para la superficie articular, Criterio principal: resistencia a la fatiga, Fuerzas predominantes: cizallamiento en los anclajes",
        "c) Material: Aleación de titanio para componentes estructurales y polietileno de ultra alto peso molecular para superficies articulares, Criterios principales: biocompatibilidad y resistencia mecánica, Fuerzas predominantes: flexión y torsión en el pasador, tensión y compresión en los vástagos",
        "d) Material: Acero inoxidable 316L, Criterio principal: bajo costo, Fuerzas predominantes: torsión en el componente humeral"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "14. Un odontólogo realiza la exodoncia de un molar inferior utilizando un elevador dental recto. El elevador actúa como una palanca de primer género donde el punto de apoyo (fulcro) se encuentra en el hueso alveolar. La distancia desde el punto de aplicación de la fuerza en el mango del elevador hasta el fulcro es de 12 cm, mientras que la distancia desde el fulcro hasta el punto de resistencia en el diente es de 0.8 cm. Si el odontólogo aplica una fuerza de 45 N en el mango del elevador, ¿cuál es la fuerza resultante aplicada sobre el diente para lograr su luxación?",
      opciones: [
        "A) 3 N",
        "B) 432 N",
        "C) 540 N",
        "D) 675 N"
      ],
      respuestaCorrecta: 3,
    },
    {
      texto: "15. Un paciente llega a urgencias tras caer de un andamio en una obra. Presenta una fractura por compresión en la tibia. Para corroborar su versión sobre la altura de la caída, el médico forense realiza un análisis biomecánico. ¿Desde qué altura aproximada cayó el paciente?",
      opciones: [
        "A) 5,25 m (equivalente a ~1,75 pisos)",
        "B) 10,50 m (equivalente a ~3,5 pisos)",
        "C) 15,76 m (equivalente a ~5,25 pisos)",
        "D) 20,00 m (equivalente a ~6,67 pisos)"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "16. Un astronauta realiza un experimento para evaluar la atrofia muscular durante su misión de 3 meses (12 semanas) en la Estación Espacial Internacional (EEI). Tras 12 semanas en el espacio, responde: ¿Cuál es la fuerza máxima que el astronauta podrá generar con el deltoides al regresar a la Tierra?",
      opciones: [
        "A) 15,00 N",
        "B) 19,28 N",
        "C) 24,57 N",
        "D) 30,00 N"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "17. ¿Cuál es la principal diferencia entre músculo estriado y músculo liso en el cuerpo humano?",
      opciones: [
        "a) El músculo estriado es de movimiento voluntario",
        "b) El músculo liso es de movimiento voluntario",
        "c) El músculo liso es el que compone al corazón",
        "d) Uno tiene fibras más largas que el otro"
      ],
      respuestaCorrecta: 0,
    },
    {
      texto: "18. ¿Cuál de estos elementos no es un biomaterial?",
      opciones: [
        "a) Válvula cardiaca de cochino",
        "b) Titanio",
        "c) Acero",
        "d) Catgut"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "19. Una paciente de 68 años con osteoporosis posmenopáusica avanzada presenta una disminución significativa de la densidad mineral ósea en su fémur proximal. Si esta paciente aplica la misma fuerza sobre la cadera al caminar que una persona con densidad ósea normal, el esfuerzo aplicado en el área debilitada será:",
      opciones: [
        "a) El triple",
        "b) Un tercio",
        "c) El cuádruple",
        "d) El doble"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "20. ¿Qué tipo de esfuerzo soportan más los dientes?",
      opciones: [
        "a) Compresión",
        "b) Tensión",
        "c) Torsión",
        "d) Flexión"
      ],
      respuestaCorrecta: 0,
    },
    {
      texto: "21. ¿Qué tipo de lesión pertenece a un esguince?",
      opciones: [
        "a) Rotura del ligamento",
        "b) Desprendimiento del ligamento con el hueso",
        "c) Estiramiento “permanente” del tendón",
        "d) Desprendimiento del ligamento del musculo"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "22. En un músculo peniforme con ángulo de penación de 40° medido desde la vertical, ¿qué porcentaje de la fuerza muscular contribuye directamente a la fuerza de contracción?",
      opciones: [
        "a) 100%",
        "b) 77%",
        "c) 72%",
        "d) 64%"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "23. La propiedad del hueso que hace que su comportamiento mecánico varíe según la velocidad de la carga aplicada se denomina:",
      opciones: [
        "a) Viscoelasticidad",
        "b) Anisotropía",
        "c) Ductilidad",
        "d) Porosidad"
      ],
      respuestaCorrecta: 0,
    },
    {
      texto: "24. Un odontólogo está evaluando la resistencia de diferentes materiales para una restauración molar en un paciente con bruxismo severo. ¿Qué material se puede colocar para el esfuerzo que ejerce el paciente?",
      opciones: [
        "a) Material A",
        "b) Material B",
        "c) Material C",
        "d) Todos los materiales resistirán la carga sin fracturarse"
      ],
      respuestaCorrecta: 3,
    },
    {
      texto: "25. La figura muestra la forma del tendón de cuádriceps al pasar por la rótula. Si la tensión T del tendón es 1400 N donde tiene un angulo de 37° medido de izquierda a derecha desde la horizontal en sentido horario y otro ángulo de 80° medido de izquierda a derecha en sentido antihorario ¿cuál es el módulo y la dirección de la fuerza de contacto FC ejercida por el fémur sobre la rótula?",
      opciones: [
        "A) 1300",
        "b) 1420",
        "c) 1596",
        "d) 1600"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "26. Un fisioterapeuta está diseñando un programa de rehabilitación para un paciente en fase inicial de recuperación de una lesión del manguito rotador. ¿Qué combinación de ejercicios sería la más adecuada para esta fase?",
      opciones: [
        "A) Press militar con mancuernas y elevaciones laterales con peso",
        "B) Rotaciones externas e internas con banda elástica a 0° de abducción",
        "C) Dominadas y fondos en paralelas",
        "D) Lanzamientos medicinales y ejercicios pliométricos"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "27. Un paciente llega a consulta tras la colocación de un fijador externo ortopédico. Respecto a los materiales y cargas mecánicas involucradas, seleccione la afirmación CORRECTA:",
      opciones: [
        "a) El componente interno debe ser de acero común por su bajo costo. Los tornillos soportan principalmente compresión pura",
        "b) Los tornillos de fijación ósea deben ser de titanio por su biocompatibilidad e integración ósea. Los puntos de anclaje presentan esfuerzos de tensión",
        "c) La estructura externa puede ser de aluminio para reducir peso. La estructura externa está sometida a flexión y torsión",
        "d) Todos los componentes deben ser pulidos para evitar alergias. No existen momentos torsionales en el sistema"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "28. Un odontólogo realiza la exodoncia de un molar inferior utilizando un elevador dental recto que actúa como palanca de primer género. ¿Cuál es la fuerza resultante sobre el diente para lograr su luxación?",
      opciones: [
        "a) 500 N",
        "b) 750 N",
        "c) 857 N",
        "d) 950 N"
      ],
      respuestaCorrecta: 2,
    },
    {
      texto: "29. Un paciente llega a urgencias tras caer de un andamio en una obra. ¿Desde qué altura aproximada cayó el paciente?",
      opciones: [
        "A) 5,25 m (equivalente a ~1,75 pisos)",
        "B) 4,39 m (equivalente a ~1,31 pisos)",
        "C) 15,76 m (equivalente a ~5,25 pisos)",
        "D) 3,00 m (equivalente a ~1 pisos)"
      ],
      respuestaCorrecta: 1,
    },
    {
      texto: "30. Un deportista en recuperación de una lesión ha mejorado del 60% al 70% de su capacidad muscular en 2 meses. ¿Cuál es la situación ACTUAL correcta?",
      opciones: [
        "a) Genera 12.3 N de fuerza, pesa 800 N, y se recomienda reposo absoluto",
        "b) Produce 17.2 N de fuerza, pesa 700 N, y necesita ejercicio progresivo + suplementos",
        "c) Desarrolla 24.6 N de fuerza, pesa 750 N, y debe hacer entrenamiento de alto impacto",
        "d) Mantiene 15.0 N de fuerza, pesa 70 N, y requiere solo estiramientos"
      ],
      respuestaCorrecta: 1,
    }
  ];

  // Función para convertir los datos al formato requerido para Excel
  const convertirDatosParaExcel = (preguntas) => {
    // Crear un array para los datos de Excel
    const datos = [];
    
    // Agregar encabezados
    datos.push(['Pregunta', 'Opción A', 'Opción B', 'Opción C', 'Opción D', 'Respuesta Correcta']);
    
    // Agregar los datos de cada pregunta
    preguntas.forEach(pregunta => {
      // La respuesta correcta como letra
      const letrasRespuestas = ['A', 'B', 'C', 'D'];
      const respuestaLetra = letrasRespuestas[pregunta.respuestaCorrecta];
      
      // Asegurarnos de que todas las opciones existan (por si acaso hay menos de 4)
      const opcionesCompletas = [...pregunta.opciones];
      while (opcionesCompletas.length < 4) {
        opcionesCompletas.push(''); // Rellenar con cadenas vacías si faltan opciones
      }
      
      // Añadir la fila con los datos
      datos.push([
        pregunta.texto,
        opcionesCompletas[0],
        opcionesCompletas[1],
        opcionesCompletas[2],
        opcionesCompletas[3],
        respuestaLetra
      ]);
    });
    
    return datos;
  };

  // Función que se ejecutará cuando se haga clic en el botón
  const generarExcel = () => {
    try {
      // Convertir los datos
      const datosExcel = convertirDatosParaExcel(preguntas);

      // Crear un libro de trabajo
      const libro = XLSX.utils.book_new();

      // Crear una hoja
      const hoja = XLSX.utils.aoa_to_sheet(datosExcel);

      // Ajustar anchos de columna
      const anchos = [
        { wch: 60 }, // Pregunta
        { wch: 25 }, // Opción A
        { wch: 25 }, // Opción B
        { wch: 25 }, // Opción C
        { wch: 25 }, // Opción D
        { wch: 10 }  // Respuesta Correcta
      ];
      hoja['!cols'] = anchos;

      // Añadir la hoja al libro
      XLSX.utils.book_append_sheet(libro, hoja, 'Preguntas de Biomecánica');

      // Escribir y descargar el archivo
      XLSX.writeFile(libro, 'Preguntas_Biomecanica.xlsx');
      
      alert('Archivo Excel generado correctamente.');
    } catch (error) {
      console.error('Error al generar el Excel:', error);
      alert('Ocurrió un error al generar el archivo Excel: ' + error.message);
    }
  };

  return (
    <div className="excel-generator">
      <h2>Generador de Excel de Preguntas de Biomecánica</h2>
      <p>Este componente permite generar un archivo Excel con las preguntas de biomecánica estructuradas en columnas.</p>
      
      <div className="button-container">
        <button 
          className="generate-button" 
          onClick={generarExcel}
        >
          Generar Excel
        </button>
      </div>
      
      <div className="preview-section">
        <h3>Contenido del Excel</h3>
        <p>El archivo Excel contendrá las siguientes columnas:</p>
        <ul>
          <li><strong>Pregunta:</strong> El texto completo de la pregunta</li>
          <li><strong>Opción A:</strong> Primera opción de respuesta</li>
          <li><strong>Opción B:</strong> Segunda opción de respuesta</li>
          <li><strong>Opción C:</strong> Tercera opción de respuesta</li>
          <li><strong>Opción D:</strong> Cuarta opción de respuesta</li>
          <li><strong>Respuesta Correcta:</strong> La letra (A, B, C, D) de la opción correcta</li>
        </ul>
      </div>
    </div>
  );
};

export default ExcelGenerator;