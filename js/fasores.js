$(document).ready(function () {

    //screen

    var width = $(window).width(), height = $(window).height();
    width = (width * 86.5 / 100);

    var cont = 1;

    //ajustePmu();

    //var cont_pmu = 9;
    //var init_angle = 0;

    var l = 62; //left
    var t = 61; //top
    var lva = 62; //left fasor A
    var tva = 61; //top fasor A
    var lseq = 336;
    var tseq = 66;

    var referencia = 3;
    var referenciaArgentina = 5;

    $('#refpmu1').next().addClass('color2');


    var seqPos = [];
    var anguloRef = 0;

    //base
    var base = [];

    base[1] = 220;
    base[2] = 220;
    base[3] = 220;
    base[4] = 220;
    base[5] = 220;
    base[6] = 220;
    base[7] = 220;
    base[8] = 220;
    base[9] = 220;
    base[10] = 220; //uta
    base[11] = 220; //UTEC
    base[12] = 220; //utalca

    //pmus
    var pmus = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var numPmus = 12


    var pmusChile = [1, 2, 3, 4, 9, 10, 11, 12];
    var pmusArgentina = [5, 6, 7, 8];

    var n = 13; //pois estou descartando 0


    //zerar angulos e modulos
    var iMax = n;
    var jMax = n;
    var dados = [];

    var contentArray = 0;


    ///ids openpdc

    //1,2,3,4
    var dadosPMUs = [];
    var anguloFaseATemp = [];


    dadospdc();

    dadosPMUs = configuracao;


    var arrayModulosA = [];
    var arrayModulosB = [];
    var arrayModulosC = [];
    var arrayAngulosA = [];
    var arrayAngulosB = [];
    var arrayAngulosC = [];
    var arrayFrequencia = [];
    var arrayDateTimeA = [];
    var arrayDateTimeB = [];
    var arrayDateTimeC = [];

    /*iniciar elementos*/

    $('#seqTextIndisponivel').css({display: 'block'});
    $('#seqTextIndisponivel').css({left: -300});

    function iniciarElementos(i) {


        $('#textIndisponivel' + i).css({display: 'block'});


    }


    var angSeq = -180
    for (var i = 1; i <= 12; i++) {


        $('.seqPositiva' + ' #seqPmu' + i).css({
            left: lseq + 'px',
            top: tseq + 'px',

            '-webkit-transform-origin': '0 0',
            '-moz-transform-origin': '0 0',
            '-ms-transform-origin': '0 0',
            '-moz-transform': 'rotate(' + -90 + 'deg)',
            '-ms-transform': 'rotate(' + -90 + 'deg)',
            '-webkit-transform': 'rotate(' + -90 + 'deg)'
        });


        $('.pmu' + i + ' #va').css({
            left: lva + 'px',
            top: tva + 'px',
            '-webkit-transform-origin': '0 0',
            '-moz-transform-origin': '0 0',
            '-ms-transform-origin': '0 0',
            '-moz-transform': 'rotate(' + 45 + 'deg)',
            '-ms-transform': 'rotate(' + 45 + 'deg)',
            '-webkit-transform': 'rotate(' + 45 + 'deg)'
        });


        $('.pmu' + i + ' #vb').css({
            left: l + 'px',
            top: t + 'px',
            '-webkit-transform-origin': '0 0',
            '-moz-transform-origin': '0 0',
            '-ms-transform-origin': '0 0',
            '-moz-transform': 'rotate(' + -90 + 'deg)',
            '-ms-transform': 'rotate(' + -90 + 'deg)',
            '-webkit-transform': 'rotate(' + -90 + 'deg)'
        });


        $('.pmu' + i + ' #vc').css({
            left: l + 'px',
            top: t + 'px',

            '-webkit-transform-origin': '0 0',
            '-moz-transform-origin': '0 0',
            '-ms-transform-origin': '0 0',
            '-moz-transform': 'rotate(' + -180 + 'deg)',
            '-ms-transform': 'rotate(' + -180 + 'deg)',
            '-webkit-transform': 'rotate(' + -180 + 'deg)'

        });


        //Fequencia inicial

        $('#frequencia').html('00.0000 Hz');
        $('#hora').html('00:00:00 00/00/0000');

    }


    function spmsIndisponivel(sistema) {


        if (sistema == 1) {


            $('.freqchile').html('00.0000 Hz');
            $('.horachile').html('00:00:00 00/00/0000');

        } else if (sistema == 2) {


            $('.freqArgentina').html('00.0000 Hz');
            $('.horaArgentina').html('00:00:00 00/00/0000');

        } else if (sistema == 0) {


            $('.freqArgentina').html('00.0000 Hz');
            $('.horaArgentina').html('00:00:00 00/00/0000');

            $('.freqchile').html('00.0000 Hz');
            $('.horachile').html('00:00:00 00/00/0000');

        }


    }

    function radiosIndisponivel(dados) {


        $.each(pmus, function (index, value) {

            var i = index;


            if ((dados[value][0].angulo == 0) || (dados[value][0].angulo == 9.99)) {

                var label = $(".ref" + (value) + ' label');

                label.css({color: '#CACAD9'});

                var checkbox = $(".ref" + (value) + ' input');
                checkbox.prop('disabled', true);

                buscaReferenciaValida(dados);
            } else {
                var label = $(".ref" + (value) + ' label');


                label.css({color: '#000'});

                var checkbox = $(".ref" + (value) + ' input');
                checkbox.prop('disabled', false);

                buscaReferenciaValida(dados);

            }

        });


    }


    zeraMatrizDados();

    function getDados() {


        buscaReferenciaValida(dados);


        var myIdentifier = String(new Date().getTime()) + Math.round(1000 * Math.random());

        $(".faseA").hide();
        $(".faseB").hide();
        $(".faseC").hide();


        //dados pmus
        var urls = [];

        var i;
        for (i = 1; i <= numPmus; i++) {


            var pmu = dadosPMUs[i].moduloA + ',' + dadosPMUs[i].moduloB + ',' + dadosPMUs[i].moduloC;
            pmu += ',' + dadosPMUs[i].anguloA + ',' + dadosPMUs[i].anguloB + ',' + dadosPMUs[i].anguloC;
            pmu += ',' + dadosPMUs[i].frequencia;

            urls[i - 1] = "proxy.php?url=" + "http://150.162.19.214:6152/historian/timeseriesdata/read/current/" + pmu + "/json&nocache=" + myIdentifier;

        }

        var erro = 0;
        var result = 0;
        $.each(urls, function (i, url) {


            $.getJSON(url, function (json) {


                try {


                    contentArray = getContent(json);


                    preparaPlot(contentArray);


                    dadosPlot();

                    var i;
                    for (i = 1; i < cont_pmu; i++) {

                        angulo = dados[i][0].angulo;
                        stat = dados[i][0].stat;

                        var sincOK = (dados[i][0].stat == undefined || dados[i][0].stat == 64 || dados[i][0].stat == 0);

                        if ((angulo == 0) || (angulo == 9.99) || !sincOK) {
                            $('#seqPmu' + i).css({display: 'none'});

                        }

                    }


                } catch (err) {

                    //console.log('erro getJSON request failed! ' + ' '+url);

                    //iniciarElementos(i);

                }


            })

                .fail(function (jqXHR, textStatus, errorThrown) {

                    var id = i + 1;

                    erro = erro + 1;

                    $('#seqPmu' + id).css({display: 'none'});


                    if (erro == n) {


                        //limpar

                        location.reload();


                    }


                    //console.log('getJSON request failed! '+' id+ ' + textStatus+' '+url);

                    var obj = {
                        angulo: 0,
                        modulo: 0,
                        escala: 0,
                        id: 0
                    };


                    dados[id][i] = obj;

                })


        });


        plot(dados);


        setTimeout(getDados, 1000); // refresh every 1 second
    }


    function zeraMatrizDados() {


        for (i = 0; i < iMax; i++) {
            dados[i] = [];
            for (j = 0; j < jMax; j++) {

                var obj = {
                    angulo: 0,
                    modulo: 0,
                    escala: 0,
                    id: 0
                };


                dados[i][j] = obj;
            }

            arrayModulosA[i] = '9.99';
            arrayModulosB[i] = '9.99';
            arrayModulosC[i] = '9.99';
            arrayAngulosA[i] = '9.99';
            arrayAngulosB[i] = '9.99';
            arrayAngulosC[i] = '9.99';
            arrayFrequencia[i] = '9.99';
            arrayDateTimeA[i] = '9.99';
            arrayDateTimeB[i] = '9.99';
            arrayDateTimeC[i] = '9.99';
        }


    }


    function getContent(data) {


        var a = 0;
        var m = 0;
        var freq = 0;

        var content = data.TimeSeriesDataPoints;


        var datatime = content[0].Time;


        if (datatime) {
            /*var res = datatime.substr(0, 19);

            res=my_date_format(res);


             if( $(".chile .faseA").is(":visible"))  {
                 $('.freq_hora .chile .hora').html(res);
                }


             if( $(".argentina .faseA").is(":visible"))  {
                 $('.freq_hora .argentina .hora').html(res);
             }*/


            var m = [];
            var a = [];


            var contentArrayAux = [];

            $.each(content, function (idx, obj) {


                var historianID = obj.HistorianID;
                var res = obj.Time.substr(0, 19);
                var datatime = res;
                var value = obj.Value;


                var dadosContent = {
                    historianID: historianID,
                    datatime: datatime,
                    value: value,

                };

                contentArrayAux[idx] = dadosContent;


            });
        } else {


            spmsIndisponivel(3);
        }


        return contentArrayAux;
    }

    function preparaPlot(contentArray) {


        $.each(dadosPMUs, function (idx, objPMU) {


            if (objPMU) {


                $.each(contentArray, function (idx2, objContent) {


                    if (objContent) {
                        //Modulos
                        if (objPMU.moduloA == objContent.historianID) {


                            var idSeq = objPMU.idseq;

                            //alert(idSeq);

                            if (objContent.value) {
                                arrayModulosA[idSeq] = objContent.value;
                            }

                        }

                        if (objPMU.moduloB == objContent.historianID) {

                            var idSeq = objPMU.idseq;

                            if (objContent.value) {
                                arrayModulosB[idSeq] = objContent.value;
                            }
                        }

                        if (objPMU.moduloC == objContent.historianID) {

                            var idSeq = objPMU.idseq;

                            if (objContent.value) {
                                arrayModulosC[idSeq] = objContent.value;
                            }

                        }

                        //Angulos

                        if (objPMU.anguloA == objContent.historianID) {

                            var idSeq = objPMU.idseq;


                            if (objContent.value) {

                                /*ler etiqueta de tempo*/


                                if (arrayDateTimeA[idSeq] != objContent.datatime) {
                                    arrayDateTimeA[idSeq] = objContent.datatime;
                                    arrayAngulosA[idSeq] = objContent.value;
                                } else {

                                    arrayDateTimeA[idSeq] = objContent.datatime;
                                    arrayAngulosA[idSeq] = 9.99;
                                }


                            }


                        }

                        if (objPMU.anguloB == objContent.historianID) {

                            var idSeq = objPMU.idseq;

                            if (objContent.value) {

                                /*ler etiqueta de tempo*/


                                if (arrayDateTimeB[idSeq] != objContent.datatime) {
                                    arrayDateTimeB[idSeq] = objContent.datatime;
                                    arrayAngulosB[idSeq] = objContent.value;
                                } else {

                                    arrayDateTimeB[idSeq] = objContent.datatime;
                                    arrayAngulosB[idSeq] = 9.99;
                                }

                            }

                        }

                        if (objPMU.anguloC == objContent.historianID) {

                            var idSeq = objPMU.idseq;

                            if (objContent.value) {

                                /*ler etiqueta de tempo*/


                                if (arrayDateTimeC[idSeq] != objContent.datatime) {
                                    arrayDateTimeC[idSeq] = objContent.datatime;
                                    arrayAngulosC[idSeq] = objContent.value;
                                } else {

                                    arrayDateTimeC[idSeq] = objContent.datatime;
                                    arrayAngulosC[idSeq] = 9.99;
                                }


                            }

                        }

                        if (objPMU.frequencia == objContent.historianID) {

                            var idSeq = objPMU.idseq;

                            if (objContent.value) {
                                arrayFrequencia[idSeq] = objContent.value.toFixed(4);
                            }

                        }
                    }

                });
            }
        });


    }


    //buscaReferenciaValida(dados)


    function dadosPlot() {
        //montar array de dados para plotagem


        $.each(dadosPMUs, function (idx, objPMU) {


            if (objPMU) {
                var id = objPMU.idseq;


                ///fase A
                var m = arrayModulosA[id];
                var a = arrayAngulosA[id];
                var freq = arrayFrequencia[id];
                var time = arrayDateTimeA[id]

                //alert(m);

                if ((m) && (a)) {

                    var escala = 0.5;


                    valorM = (m / dadosPMUs[id].base);


                    if (valorM < 1.0) {
                        valorM = valorM * 0.99;
                    } else if (valorM > 1.0) {
                        valorM = valorM * 1.01;
                    }

                    valorM = (valorM * 1.55);

                    v = 100 * valorM / 1.6;
                    valorM = v;


                    var escalaF = (escala * valorM) / 100;


                    var valoresPMU = {
                        angulo: a,
                        modulo: m,
                        escala: escalaF,
                        frequencia: freq,
                        time: time,
                        id: id
                    };


                    dados[id][0] = valoresPMU;


                }

                ///fase B
                var m = arrayModulosB[id];
                var a = arrayAngulosB[id];
                var freq = arrayFrequencia[id];

                if ((m) && (a)) {

                    var escala = 0.5;


                    valorM = (m / dadosPMUs[id].base);


                    if (valorM < 1.0) {
                        valorM = valorM * 0.99;
                    } else if (valorM > 1.0) {
                        valorM = valorM * 1.01;
                    }

                    valorM = (valorM * 1.55);

                    v = 100 * valorM / 1.6;
                    valorM = v;


                    var escalaF = (escala * valorM) / 100;

                    var valoresPMU = {
                        angulo: a,
                        modulo: m,
                        escala: escalaF,
                        frequencia: freq,
                        id: id
                    };

                    dados[id][1] = valoresPMU;


                }

                ///fase C
                var m = arrayModulosC[id];
                var a = arrayAngulosC[id];
                var freq = arrayFrequencia[id];

                if ((m) && (a)) {

                    var escala = 0.5;


                    valorM = (m / dadosPMUs[id].base);


                    if (valorM < 1.0) {
                        valorM = valorM * 0.99;
                    } else if (valorM > 1.0) {
                        valorM = valorM * 1.01;
                    }

                    valorM = (valorM * 1.55);

                    v = 100 * valorM / 1.6;
                    valorM = v;


                    var escalaF = (escala * valorM) / 100;

                    var valoresPMU = {
                        angulo: a,
                        modulo: m,
                        escala: escalaF,
                        frequencia: freq,
                        id: id
                    };

                    dados[id][2] = valoresPMU;
                    dados[id][3] = valoresPMU;


                }


            } else {
                var valoresPMU = {
                    angulo: 0,
                    modulo: 0,
                    escala: 0,
                    frequencia: 0,
                    id: idx + 1
                };

                dados[idx + 1][0] = valoresPMU;
                dados[idx + 1][1] = valoresPMU;
                dados[idx + 1][2] = valoresPMU;
                dados[idx + 1][3] = valoresPMU;
            }


        });


    }


    getDados();


    function rotate(angle, elem, escala, id) {


        var $elem = elem;


        //angulo fase
        var cos = Math.cos(angle * Math.PI / 180);
        var sin = Math.sin(angle * Math.PI / 180);
        var fase = Math.atan2(cos, sin);
        var fase = fase * 180 / Math.PI;

        fase = fase + 180;


        //rotacao e escala
        $elem.css({


            'backface-visibility': 'hidden',
            '-moz-transform-origin': 'top center',
            '-moz-transform': 'rotate(' + fase + 'deg) scale(' + escala + ')',
            '-webkit-transform-origin': 'top center',
            '-webkit-transform': 'rotate(' + fase + 'deg) scale(' + escala + ')',
            '-ms-transform-origin': 'top center',
            '-ms-transform': 'rotate(' + fase + 'deg) scale(' + escala + ')',


        });
        elem.addClass('no-flickr');


    }


    $('.radioReferenciasChile').on('change', function () {
        referencia = $(this).attr('id');


        $.ajax({
            type: 'POST',
            url: 'sessao.php',
            data: {acao: "gravarSessaoChile", referencia: referencia},
            dataType: 'json',
            async: false,
            success: function (data) {

                //console.log(data);

            }
        });


    });


    $('.radioReferenciasArgentina').on('change', function () {
        referenciaArgentina = $(this).attr('id');


        $.ajax({
            type: 'POST',
            url: 'sessao.php',
            data: {acao: "gravarSessaoArgentina", referenciaArgentina: referenciaArgentina},
            dataType: 'json',
            async: false,
            success: function (data) {


            }
        });


    });


    function buscaReferenciaValida(dados) {

        //busca selecionado

        //var nChile = 5;
        //var nArgentina = 9;
        if ((dados[referencia][0].angulo == 0) || (dados[referencia][0].angulo == '9.99')) {

            for (var i = 1; i <= numPmus; i++) {


                if (jQuery.inArray(i, pmusChile) != -1) {


                    if ((dados[i][0].angulo != 0) && (dados[i][0].angulo != '9.99')) {

                        var angulo = dados[i][0].angulo;

                        referencia = i;


                        //console.log(referencia);
                        var checkbox = $(".ref" + (referencia) + ' input');
                        checkbox.prop('disabled', false);
                        checkbox.prop('checked', 'true');


                        i = numPmus;
                        // radiosIndisponivel(dados);


                    }

                }
            }
        }


        /*argentina*/
        if ((dados[referenciaArgentina][0].angulo == 0) || (dados[referenciaArgentina][0].angulo == '9.99')) {


            for (var i = 1; i <= numPmus; i++) {


                if (jQuery.inArray(i, pmusArgentina) != -1) {


                    if ((dados[i][0].angulo != 0) && (dados[i][0].angulo != '9.99')) {


                        var angulo = dados[i][0].angulo;


                        referenciaArgentina = i;

                        //console.log(referencia);
                        var checkbox = $(".ref" + (referenciaArgentina) + ' input');
                        checkbox.prop('disabled', false);
                        checkbox.prop('checked', 'true');

                        i = numPmus;

                        // radiosIndisponivel(dados);


                    }
                }

            }
        }


        ajustePmu();


    }


    function htmlFasores() {

        var htmlFasores = '<div class="faseA" id="va" > </div>';
        htmlFasores += '<div class="faseB" id="vb" > </div>';
        htmlFasores += '<div class="faseC" id="vc" > </div>';


        $(".pmu1").html(htmlFasores);


        var htmlFasores = '<div class="faseA" id="va" > </div>';
        htmlFasores += '<div class="faseB" id="vb" > </div>';
        htmlFasores += '<div class="faseC" id="vc" > </div>';


        $(".pmu2").html(htmlFasores);


        var htmlFasores = '<div class="faseA" id="va" > </div>';
        htmlFasores += '<div class="faseB" id="vb" > </div>';
        htmlFasores += '<div class="faseC" id="vc" > </div>';


        $(".pmu3").html(htmlFasores);


        var htmlFasores = '<div class="faseA" id="va" > </div>';
        htmlFasores += '<div class="faseB" id="vb" > </div>';
        htmlFasores += '<div class="faseC" id="vc" > </div>';


        $(".pmu4").html(htmlFasores);

        var htmlFasores = '<div class="faseA" id="va" > </div>';
        htmlFasores += '<div class="faseB" id="vb" > </div>';
        htmlFasores += '<div class="faseC" id="vc" > </div>';


        $(".pmu5").html(htmlFasores);


        var htmlFasores = '<div class="faseA" id="va" > </div>';
        htmlFasores += '<div class="faseB" id="vb" > </div>';
        htmlFasores += '<div class="faseC" id="vc" > </div>';


        $(".pmu6").html(htmlFasores);


        var htmlFasores = '<div class="faseA" id="va" > </div>';
        htmlFasores += '<div class="faseB" id="vb" > </div>';
        htmlFasores += '<div class="faseC" id="vc" > </div>';


        $(".pmu7").html(htmlFasores);


        var htmlFasores = '<div class="faseA" id="va" > </div>';
        htmlFasores += '<div class="faseB" id="vb" > </div>';
        htmlFasores += '<div class="faseC" id="vc" > </div>';


        $(".pmu8").html(htmlFasores);


        var htmlFasores = '<div class="faseA" id="va" > </div>';
        htmlFasores += '<div class="faseB" id="vb" > </div>';
        htmlFasores += '<div class="faseC" id="vc" > </div>';

        $(".pmu9").html(htmlFasores);


        var htmlFasores = '<div class="faseA" id="va" > </div>';
        htmlFasores += '<div class="faseB" id="vb" > </div>';
        htmlFasores += '<div class="faseC" id="vc" > </div>';

        $(".pmu10").html(htmlFasores);


        var htmlFasores = '<div class="faseA" id="va" > </div>';
        htmlFasores += '<div class="faseB" id="vb" > </div>';
        htmlFasores += '<div class="faseC" id="vc" > </div>';

        $(".pmu11").html(htmlFasores);


        var htmlFasores = '<div class="faseA" id="va" > </div>';
        htmlFasores += '<div class="faseB" id="vb" > </div>';
        htmlFasores += '<div class="faseC" id="vc" > </div>';

        $(".pmu12").html(htmlFasores);


        ajusteCssFasores();

        htmlSeqPositiva(dados, n);


    }


    function ajusteCssFasores() {

        for (var i = 1; i <= 12; i++) {


            $('.pmu' + i + ' #va').css({
                left: lva + 'px',
                top: tva + 'px',
                '-webkit-transform-origin': '0 0',
                '-moz-transform-origin': '0 0',
                '-ms-transform-origin': '0 0',
                '-moz-transform': 'rotate(' + 45 + 'deg)',
                '-ms-transform': 'rotate(' + 45 + 'deg)',
                '-webkit-transform': 'rotate(' + 45 + 'deg)'
            });


            $('.pmu' + i + ' #vb').css({
                left: l + 'px',
                top: t + 'px',
                '-webkit-transform-origin': '0 0',
                '-moz-transform-origin': '0 0',
                '-ms-transform-origin': '0 0',
                '-moz-transform': 'rotate(' + -90 + 'deg)',
                '-ms-transform': 'rotate(' + -90 + 'deg)',
                '-webkit-transform': 'rotate(' + -90 + 'deg)'
            });


            $('.pmu' + i + ' #vc').css({
                left: l + 'px',
                top: t + 'px',

                '-webkit-transform-origin': '0 0',
                '-moz-transform-origin': '0 0',
                '-ms-transform-origin': '0 0',
                '-moz-transform': 'rotate(' + -180 + 'deg)',
                '-ms-transform': 'rotate(' + -180 + 'deg)',
                '-webkit-transform': 'rotate(' + -180 + 'deg)'

            });


        }


        ajustePmu();

    }

    function htmlSeqPositiva(dados, n) {

        var htmlSeqPositivaT = '<div class="fasorSeqPos1 seqPos" id="seqPmu1" style="display:none" > </div>';
        htmlSeqPositivaT += '<div class="fasorSeqPos2 seqPos" id="seqPmu2" style="display:none"> </div>';
        htmlSeqPositivaT += '<div class="fasorSeqPos3 seqPos" id="seqPmu3" style="display:none"> </div>';
        htmlSeqPositivaT += '<div class="fasorSeqPos4 seqPos" id="seqPmu4" style="display:none"> </div>';
        htmlSeqPositivaT += '<div class="fasorSeqPos9 seqPos" id="seqPmu9" style="display:none"> </div>';
        htmlSeqPositivaT += '<div class="fasorSeqPos10 seqPos" id="seqPmu10" style="display:none"> </div>';
        htmlSeqPositivaT += '<div class="fasorSeqPos12 seqPos" id="seqPmu12" style="display:none"> </div>';


        $(".seqPositiva").html(htmlSeqPositivaT);
        $("#seqTextIndisponivel").show();
        $(".seqPositiva").hide();

        htmlSeqPositivaT = '';
        htmlSeqPositivaT += '<div class="fasorSeqPos5 seqPos" id="seqPmu5" style="display:none"> </div>';
        htmlSeqPositivaT += '<div class="fasorSeqPos6 seqPos" id="seqPmu6" style="display:none"> </div>';
        htmlSeqPositivaT += '<div class="fasorSeqPos7 seqPos" id="seqPmu7" style="display:none"> </div>';
        htmlSeqPositivaT += '<div class="fasorSeqPos8 seqPos" id="seqPmu8" style="display:none"> </div>';
        htmlSeqPositivaT += '<div class="fasorSeqPos11 seqPos" id="seqPmu11" style="display:none"> </div>';


        $(".seqPositivaArgentina").html(htmlSeqPositivaT);
        $(".seqPositivaArgentina").hide();

    }


    function plot(dados) {

        var anguloRef = 0;
        var anguloRefArgentina = 0;


        for (var i = 1; i <= numPmus; i++) {

            if (jQuery.inArray(i, pmusChile) != -1) {

                if (i == referencia) {


                    anguloRef = dados[i][0].angulo;


                }
            }
        }

        /*argentina*/


        for (var i = 1; i <= numPmus; i++) {

            if (jQuery.inArray(i, pmusArgentina) != -1) {


                if (i == referenciaArgentina) {

                    anguloRefArgentina = dados[i][0].angulo;


                }
            }
        }


        htmlFasores();


        for (var i = 1; i <= numPmus; i++) {


            if (jQuery.inArray(i, pmusChile) != -1) {

                var freq = 0;


                if (i == referencia) {
                    anguloRef = dados[i][0].angulo;

                    freq = dados[i][0].frequencia;
                }

                buscaReferenciaValida(dados);
                radiosIndisponivel(dados);

                var id = i;

                //fase A
                var angulo = dados[i][0].angulo;
                var modulo = dados[i][0].modulo;
                var escala = dados[i][0].escala;


                if (freq) {
                    $('#frequencia').html(freq + ' Hz');
                }

                var elem = $('.pmu' + id + ' #va');

                var elem_pmu = $('.pmu' + id);

                var elem_seqpositiva = $('.chile #circChile');


                if (elem) {


                    if ((angulo == 0) || (angulo == 9.99)) {

                        elem.css({display: 'none'});


                        elem_seqpositiva.css({'background-image': 'url(\'img/circulo3.png\')'});
                        elem_pmu.css({'background-image': 'url(\'img/circuloi.png\')'});

                    } else {
                        elem.css({display: 'block'});

                        elem_seqpositiva.css({'background-image': 'url(\'img/circulo4.png\')'});
                        elem_pmu.css({'background-image': 'url(\'img/circulo.png\')'});


                        if ((id <= 4) || (id == 10)) {
                            $(".seqPositiva").show();
                        }


                        rotate(angulo, elem, escala);

                    }

                }


                //faseB
                var angulo = dados[i][1].angulo;
                var modulo = dados[i][1].modulo;
                var escala = dados[i][1].escala;

                var elem = $('.pmu' + id + ' #vb');
                if (elem) {
                    if ((angulo == 0) || (angulo == 9.99)) {

                        elem.css({display: 'none'});

                    } else {
                        elem.css({display: 'block'});


                        rotate(angulo, elem, escala);

                    }

                }


                //faseC
                var angulo = dados[i][2].angulo;
                var modulo = dados[i][2].modulo;
                var escala = dados[i][2].escala;

                var elem = $('.pmu' + id + ' #vc');

                if (elem) {
                    //alert(angulo);

                    if ((angulo == 0) || (angulo == 9.99)) {

                        elem.css({display: 'none'});

                        //ultima pmu
                        if (i == 4) {
                            var elem = $('.pmu' + id);
                            elem.css({'margin-top': '70px'});

                        }
                    } else {
                        elem.css({display: 'block'});
                        rotate(angulo, elem, escala);


                    }

                }


            }


        }


        /*argentina*/

        for (var i = 1; i <= numPmus; i++) {


            if (jQuery.inArray(i, pmusArgentina) != -1) {

                var freqArgentina = 0;


                if (i == referenciaArgentina) {
                    anguloRefArgentina = dados[i][3].angulo;


                    freqArgentina = dados[i][0].frequencia;
                }

                buscaReferenciaValida(dados);
                radiosIndisponivel(dados);

                var id = i;


                //fase A
                var angulo = dados[i][0].angulo;
                var modulo = dados[i][0].modulo;
                var escala = dados[i][0].escala;


                if (freqArgentina) {
                    $('#frequenciaArgentina').html(freqArgentina + ' Hz');
                }

                var elem = $('.pmu' + id + ' #va');

                var elem_pmu = $('.pmu' + id);

                var elem_seqpositiva = $('.argentina #circArgentina');

                if (elem) {

                    if ((angulo == 0) || (angulo == 9.99)) {

                        elem.css({display: 'none'});

                        elem_seqpositiva.css({'background-image': 'url(\'img/circulo3.png\')'});
                        elem_pmu.css({'background-image': 'url(\'img/circuloi.png\')'});

                    } else {
                        elem.css({display: 'block'});

                        elem_seqpositiva.css({'background-image': 'url(\'img/circulo4.png\')'});
                        elem_pmu.css({'background-image': 'url(\'img/circulo.png\')'});

                        $(".seqPositivaArgentina").show();

                        rotate(angulo, elem, escala);


                    }
                    $(".label" + id + " .a").html('id=' + id + " " + angulo);

                }


                //faseB
                var angulo = dados[i][1].angulo;
                var modulo = dados[i][1].modulo;
                var escala = dados[i][1].escala;

                var elem = $('.pmu' + id + ' #vb');
                if (elem) {
                    if ((angulo == 0) || (angulo == 9.99)) {

                        elem.css({display: 'none'});

                    } else {
                        elem.css({display: 'block'});


                        rotate(angulo, elem, escala);

                    }

                    $(".label" + id + " .b").html('id=' + id + " " + angulo);

                }


                //faseC
                var angulo = dados[i][2].angulo;
                var modulo = dados[i][2].modulo;
                var escala = dados[i][2].escala;

                var elem = $('.pmu' + id + ' #vc');

                if (elem) {
                    //alert(angulo);

                    if ((angulo == 0) || (angulo == 9.99)) {

                        elem.css({display: 'none'});

                        //ultima pmu
                        if (i == 4) {
                            var elem = $('.pmu' + id);
                            elem.css({'margin-top': '70px'});

                        }
                    } else {
                        elem.css({display: 'block'});
                        rotate(angulo, elem, escala);

                        if (i == 4) {
                            var elem = $('.pmu' + id);
                            elem.css({'margin-top': '185px'});
                        }

                    }

                    $(".label" + id + " .c").html('id=' + id + " " + angulo);

                }


            }


        }


        /*chile*/

        if (!$(".chile .faseA").is(":visible")) {


            var elem_seqpositiva = $('.chile #circChile');
            elem_seqpositiva.css({'background-image': 'url(\'img/circulo3.png\')'});

            spmsIndisponivel(1);

            radiosIndisponivel(dados);


        } else {


            var elem_seqpositiva = $('.chile #circChile');
            elem_seqpositiva.css({'background-image': 'url(\'img/circulo4.png\')'});


            radiosIndisponivel(dados);

        }

        /*argentina*/
        if (!$(".argentina .faseA").is(":visible")) {

            var elem_seqpositiva = $('.argentina #circArgentina');
            elem_seqpositiva.css({'background-image': 'url(\'img/circulo3.png\')'});

            spmsIndisponivel(2);

            radiosIndisponivel(dados);


        } else {

            var elem_seqpositiva = $('.argentina #circArgentina');
            elem_seqpositiva.css({'background-image': 'url(\'img/circulo4.png\')'});

            radiosIndisponivel(dados);

        }


        ///seq positiva chile


        for (var i = 1; i <= numPmus; i++) {


            if (jQuery.inArray(i, pmusChile) != -1) {
                if (dados[i][0].angulo != 9.99) {
                    seqPositivaChile(dados, i);
                }
            }
        }


        for (var i = 1; i <= numPmus; i++) {


            if (jQuery.inArray(i, pmusArgentina) != -1) {
                if (dados[i][0].angulo != 9.99) {
                    seqPositivaArgentina(dados, i);
                }
            }
        }


    }


    function seqPositivaChile(dados, id) {


        var conf = configuracao[id];
        //seq positiva

        var voltages = {
            "voltageA": {
                "mod": dados[id][0].modulo,
                "ang": dados[id][0].angulo
            },
            "voltageB": {
                "mod": dados[id][1].modulo,
                "ang": dados[id][1].angulo
            },
            "voltageC": {
                "mod": dados[id][2].modulo,
                "ang": dados[id][2].angulo
            },
            "pmu": id,

            conf
        }

        //console.log(voltages);


        var seqpositivaValida = symmetricalComponents(voltages);

        var anguloSeqPositiva = seqpositivaValida.positiveSequenceVoltage.ang;

        var modSeqPositiva = seqpositivaValida.positiveSequenceVoltage.mod;

        //console.log('SeqPosCalc: ', seqpositivaValida);

        if (anguloSeqPositiva != null) {

            var angulo = anguloSeqPositiva;
            var modulo = modSeqPositiva;


            var anguloRef = 0;

            for (var i = 1; i <= numPmus; i++) {


                if (jQuery.inArray(i, pmusChile) != -1) {

                    var sincOK = (dados[i][0].stat == undefined || dados[i][0].stat == 64 || dados[i][0].stat == 0);


                    if (dados[referencia][0].angulo == 0 || dados[referencia][0].angulo == 9.99 || !sincOK) {
                        buscaReferenciaValida(dados);
                    }


                    if (i == referencia) {

                        anguloRef = dados[i][0].angulo;
                    }
                }
            }


            var fd = angulo - anguloRef;


            if (fd > 180.0) {
                fd = fd - 360;
            } else {
                if (fd < -180.0) {
                    //var diferenca = fd - 360;
                    fd = fd + 360;
                }
            }


            //console.log(fd);

            var escala = 0.81;


            var valorM = (modulo / base[id]);

            if (valorM < 1.0) {
                valorM = valorM * 0.99;
            } else if (valorM > 1.0) {
                valorM = valorM * 1.01;
            }

            valorM = (valorM * 1.55);

            v = 100 * valorM / 1.6;
            valorM = v;


            var escalaF = (escala * valorM) / 100;


            //angulo = dados[id][0].angulo;

            var elemseq = $('.seqPositiva ' + ' #seqPmu' + id);


            elemseq.css({display: 'none'});


            if ((angulo == anguloFaseATemp[id])) {

                $.ajax({
                    type: 'POST',
                    url: 'sessao.php',
                    data: {acao: "gravarSessaoChile", referencia: referencia},
                    dataType: 'json',
                    async: false,
                    success: function (data) {

                        //console.log(data);

                    }
                });


            } else {


                if (elemseq) {

                    if ((angulo == 0) || (angulo == 9.99)) {

                        elemseq.css({display: 'none'});


                    } else {


                        $("#angulo" + id).html('FaseA ' + id + ':   ' + angulo);
                        anguloFaseATemp[id] = angulo;

                        //console.log(id);
                        elemseq.css({display: 'block'});
                        rotate(fd, elemseq, escalaF);

                        var datatime = dados[referencia][0].time;

                        //console.log(datatime+ ' '+i+ ' '+id);

                        var res = datatime.substr(0, 19);

                        res = my_date_format(res);


                        if ($(".chile .faseA").is(":visible")) {
                            $('.freq_hora .chile .hora').html(res);
                        }


                    }

                }
            }
        } else {
            var elemseq = $('.seqPositiva ' + ' #seqPmu' + id);
            elemseq.css({display: 'none'});
        }

    }


    function seqPositivaArgentina(dados, id) {


        var conf = configuracao[id];

        //seq positiva

        var voltages = {
            "voltageA": {
                "mod": dados[id][0].modulo,
                "ang": dados[id][0].angulo
            },
            "voltageB": {
                "mod": dados[id][1].modulo,
                "ang": dados[id][1].angulo
            },
            "voltageC": {
                "mod": dados[id][2].modulo,
                "ang": dados[id][2].angulo
            },
            "pmu": id,

            conf
        }

        //console.log(voltages);

        var seqpositivaValida = symmetricalComponents(voltages);

        var anguloSeqPositiva = seqpositivaValida.positiveSequenceVoltage.ang;

        if (anguloSeqPositiva != null) {

            var angulo = anguloSeqPositiva;
            var modulo = dados[id][0].modulo;

            var anguloRefAgentina = 0;

            for (var i = 1; i <= numPmus; i++) {


                if (jQuery.inArray(i, pmusArgentina) != -1) {

                    var sincOK = (dados[i][0].stat == undefined || dados[i][0].stat == 64 || dados[i][0].stat == 0);


                    if (dados[referencia][0].angulo == 0 || dados[referencia][0].angulo == 9.99 || !sincOK) {
                        buscaReferenciaValida(dados);
                    }

                    if (i == referenciaArgentina) {

                        anguloRefAgentina = dados[i][0].angulo;


                    }
                }
            }


            var fd = angulo - anguloRefAgentina;


            if (fd > 180.0) {
                fd = fd - 360;
            } else {
                if (fd < -180.0) {
                    //var diferenca = fd - 360;
                    fd = fd + 360;
                }
            }


            //console.log(fd);

            var escala = 0.80;


            var valorM = (modulo / base[id]);


            if (valorM < 1.0) {
                valorM = valorM * 0.99;
            } else if (valorM > 1.0) {
                valorM = valorM * 1.01;
            }

            valorM = (valorM * 1.55);

            v = 100 * valorM / 1.6;
            valorM = v;


            var escalaF = (escala * valorM) / 100;


            // angulo = dados[id][0].angulo;
            //
            angulo = anguloSeqPositiva;

            var elemseq = $('.seqPositivaArgentina ' + ' #seqPmu' + id);


            elemseq.css({display: 'none'});


            if ((angulo == anguloFaseATemp[id])) {

                $.ajax({
                    type: 'POST',
                    url: 'sessao.php',
                    data: {acao: "gravarSessaoArgentina", referenciaArgentina: referencia},
                    dataType: 'json',
                    async: false,
                    success: function (data) {

                        //console.log(data);

                    }
                });


                if (elemseq) {

                    if ((angulo == 0) || (angulo == 9.99)) {

                        elemseq.css({display: 'none'});

                    } else {


                        $("#angulo" + id).html('FaseA ' + id + ':   ' + angulo);
                        anguloFaseATemp[id] = angulo;


                        //console.log(id);
                        elemseq.css({display: 'block'});
                        rotate(fd, elemseq, escalaF);


                    }

                }

                //location.reload();


            } else {

                //$('.seqPositiva').css({diplay:'block'});

                if (elemseq) {

                    if ((angulo == 0) || (angulo == 9.99)) {

                        elemseq.css({display: 'none'});

                    } else {


                        $("#angulo" + id).html('FaseA ' + id + ':   ' + angulo);
                        anguloFaseATemp[id] = angulo;


                        //console.log(id);
                        elemseq.css({display: 'block'});
                        rotate(fd, elemseq, escalaF);

                        var datatime = dados[referencia][0].time;

                        //console.log(datatime+ ' '+i+ ' '+id);

                        var res = datatime.substr(0, 19);

                        res = my_date_format(res);


                        if ($(".argentina .faseA").is(":visible")) {
                            $('.freq_hora .argentina .hora').html(res);
                        }


                    }

                }
            }
        } else {
            var elemseq = $('.seqPositivaArgentina ' + ' #seqPmu' + id);
            elemseq.css({display: 'none'});
        }

    }


    var my_date_format = function (input) {

        //alert(Date.parse(input.replace(/-/g, "/")));

        input.replace(/-/g, "/");

        var b = input.split(/\D+/);

        var date = b[2] + '/' + b[1] + '/' + b[0];
        var time = b[3] + ':' + b[4] + ':' + b[5];

        return (date + " " + time);
    };


});