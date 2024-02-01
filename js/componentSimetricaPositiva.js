// Cálculo de Sequência Positiva
// Autor: Fábio Matheus Mantelli
// Data: Fevereiro de 2020

// arrow function (recebe um objeto chamado 'voltages')
var symmetricalComponents = voltages => {

    // os 3 ângulos são convertidos para radianos
    angles = {
        "angleA": voltages.voltageA.ang * Math.PI/180,
        "angleB": voltages.voltageB.ang * Math.PI/180,
        "angleC": voltages.voltageC.ang * Math.PI/180
    }

    // número i (imaginário)
    const i = math.complex('0+i')

   
    
    // transforma as tensões na notação de Euler
    complexVoltage = {
        "va": math.multiply(voltages.voltageA.mod, math.exp(math.multiply(angles.angleA, i))),
        "vb": math.multiply(voltages.voltageB.mod, math.exp(math.multiply(angles.angleB, i))),
        "vc": math.multiply(voltages.voltageC.mod, math.exp(math.multiply(angles.angleC, i)))
    }


    // vetor com as 3 fases na notação de Euler
    voltageABC = [ [complexVoltage.va], [complexVoltage.vb], [complexVoltage.vc]]

    // constante alpha para a transformada
    alpha = math.exp(math.multiply( (2/3)*Math.PI, i ))
   
    // vetor de transformação A
    var A = [1, alpha, math.multiply(alpha, alpha)]
    

    // Multplica o vetor A por 1/3
    var invA = math.multiply((1/3), A)

    // calcula a tensão de sequência positiva
    v012 = math.multiply(invA, voltageABC)

    return ({
        "positiveSequenceVoltage": {
            "mod": math.abs(v012[0]),
            "ang": v012[0].arg()*180/Math.PI
        }
    });
}

// 3 tensões como exemplo
/*voltages = {
    "voltageA": {
        "mod": 0,
        "ang": 0
    },
    "voltageB": {
        "mod": 7,
        "ang": -164
    },
    "voltageC": {
        "mod": 7,
        "ang": 105
    }
}*/

// teste passando um objeto "tensoes" contendo as tensões A, B e C (módulo e ângulo)
// var retorno = symmetricalComponents(voltages)
//console.log(retorno.positiveSequenceVoltage)