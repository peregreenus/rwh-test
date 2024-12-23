import 'regenerator-runtime/runtime'; 
import { 
  postMessageWithContentHeight, 
  delayShowChallengeData, 
  setRunStatus, 
  runChallenge, 
  asString, 
  sendCandidate, 
  handleMobile, 
  handleWeb 
} from './utils.js';

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  return (_main = _asyncToGenerator(_regeneratorRuntime().mark((function A() {
    var token, 
        challengeToken, 
        incidentId, 
        finalData, 
        challengeElement, 
        incidentElement, 
        challengeResponse, 
        errorData, 
        errorMessage, 
        urlParams, 
        isMobileMode, 
        response;

    return _regeneratorRuntime().wrap((function (A) {
      for (; ; ) {
        switch (A.prev = A.next) {
          case 0:
            postMessageWithContentHeight();
            delayShowChallengeData();
            A.prev = 2;
            challengeToken = document.getElementById('challenge')?.value; 
            incidentId = document.getElementById('incident')?.value;
            setRunStatus('⧗');
            A.next = 8;
            return runChallenge();

          case 8:
            challengeResponse = A.sent;
            setRunStatus('✔');
            token = challengeResponse.token;

            finalData = { 
              ...challengeResponse, 
              error: ''
            };
            A.next = 21;
            break;

          case 14:
            A.prev = 14;
            A.t0 = A.catch(2);
            console.error(A.t0);
            setRunStatus('✖');

            errorData = {
              level: 'critical',
              build_ts: '2024-10-15T09:22:43.174Z',
              lib_version: '0.3.2',
              challenge_id: asString(incidentId, 128),
              user_agent: asString(window.navigator.userAgent, 384),
              url: asString(window.location.href, 512),
              client_ts: (new Date).toISOString()
            };

            if (A.t0 instanceof Error) { 
              errorData.message = asString(A.t0.message, 256); 
              errorMessage = A.t0.stack; 
              errorData.stack_trace = asString(typeof errorMessage === 'string' ? errorMessage.split(window.location.href).join('') : errorMessage, 1024); 
            } else { 
              errorData.message = asString(A.t0, 1024);
            }
            
            finalData = { 
              token: challengeToken, 
              fp: '', 
              error: JSON.stringify(errorData) 
            };
            break;

          case 21:
            urlParams = new URLSearchParams(document.location.search);
            isMobileMode = urlParams.get(MODE_PARAM) === MOBILE_MODE;
            A.next = 25;
            return sendCandidate(finalData);

          case 25:
            response = A.sent;
            if (isMobileMode) { 
              handleMobile(response); 
            } else { 
              handleWeb(response, token);
            }

          case 'end':
            return A.stop()
        }
      }
    }), A, null, [
      [2, 14]
    ]);
  })))).apply(this, arguments)
}

window.addEventListener('load', main);

// Цель антибота - определить, является ли пользователь ботом или же человеком.

// после загрузки страницы вызывается функция main
// в бесконечном цикле оператор switch
// в кейсе 0 вызывается postMessageWithContentHeight для отправки сообщения с высотой контента
// затем вызывается функция delayShowChallengeData - вероятно, задержка данных

// в переменные challengeToken и incidentId (если они найдены по ID) попадают значения или undefined
// статус выполнения устанавливается в "ожидание" или "⧗"
// возвращается вызов функции runChallenge, которая запускает некое действие, челлендж
// благодаря бесконечному циклу switch срабатывает снова, хотя в предыдущей строке был осуществлен выход из него

// если runChallenge отрабатывает успешно, устанавливается статус "✔"
// переменной присваивается токен
// формируется объект с конечными данными челленджа
// формируется объект с url-параметрами
// определяется, мобильный ли режим
// sendCandidate отправляет данные о кандидате с конечными данными в качестве аргумента
// в переменную response записывается ответ и в зависимости от режима передается в функцию для мобильного или веб-режима
// после в кейсе "end" вызывается метод stop

// если же runChallenge отрабатывает с ошибкой, устанавливается статус "✖"
// формируется объект с данными об ошибке и объект с конечными данными со свойством error, в которое передается объект с данными о ней в строчном представлении

