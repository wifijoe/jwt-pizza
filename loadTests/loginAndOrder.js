import { sleep, check, group, fail } from 'k6'
import http from 'k6/http'

const vars = {};

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    corrected_HAR: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 5, duration: '30s' },
        { target: 15, duration: '1m' },
        { target: 10, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
      gracefulRampDown: '30s',
      exec: 'corrected_HAR',
    },
  },
}

export function corrected_HAR() {
  let response

  group('page_1 - https://pizza.missinginfo.me/', function () {
    // homepage
    response = http.get('https://pizza.missinginfo.me/', {
      headers: {
        Host: 'pizza.missinginfo.me',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        DNT: '1',
        'Sec-GPC': '1',
        Connection: 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        Priority: 'u=0, i',
        'Cache-Control': 'no-cache',
        TE: 'trailers',
      },
    })
    sleep(10)

    // Login
    response = http.put(
      'https://pizza-service.missinginfo.me/api/auth',
      '{"email":"a@jwt.com","password":"admin"}',
      {
        headers: {
          Host: 'pizza-service.missinginfo.me',
          Accept: '*/*',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Content-Type': 'application/json',
          Origin: 'https://pizza.missinginfo.me',
          DNT: '1',
          'Sec-GPC': '1',
          Connection: 'keep-alive',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          Priority: 'u=0',
          'Cache-Control': 'no-cache',
          TE: 'trailers',
        },
      }
    )
    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      fail("login was *not* 200");
    }

    vars.authToken = response.json().token;

    response = http.options('https://pizza-service.missinginfo.me/api/auth', null, {
      headers: {
        Host: 'pizza-service.missinginfo.me',
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Access-Control-Request-Method': 'PUT',
        'Access-Control-Request-Headers': 'content-type',
        Origin: 'https://pizza.missinginfo.me',
        DNT: '1',
        'Sec-GPC': '1',
        Connection: 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        Priority: 'u=4',
        'Cache-Control': 'no-cache',
        TE: 'trailers',
      },
    })
    sleep(10)

    // Menu
    response = http.get('https://pizza-service.missinginfo.me/api/order/menu', {
      headers: {
        Host: 'pizza-service.missinginfo.me',
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Content-Type': 'application/json',
        Authorization:
          `Bearer ${vars.authToken}`,
        Origin: 'https://pizza.missinginfo.me',
        DNT: '1',
        'Sec-GPC': '1',
        Connection: 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        Priority: 'u=0',
        'Cache-Control': 'no-cache',
        TE: 'trailers',
      },
    })

    response = http.options('https://pizza-service.missinginfo.me/api/order/menu', null, {
      headers: {
        Host: 'pizza-service.missinginfo.me',
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'authorization,content-type',
        Origin: 'https://pizza.missinginfo.me',
        DNT: '1',
        'Sec-GPC': '1',
        Connection: 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        Priority: 'u=4',
        'Cache-Control': 'no-cache',
        TE: 'trailers',
      },
    })

    // Franchises
    response = http.get('https://pizza-service.missinginfo.me/api/franchise', {
      headers: {
        Host: 'pizza-service.missinginfo.me',
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Content-Type': 'application/json',
        Authorization:
          `Bearer ${vars.authToken}`,
        Origin: 'https://pizza.missinginfo.me',
        DNT: '1',
        'Sec-GPC': '1',
        Connection: 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        Priority: 'u=4',
        'Cache-Control': 'no-cache',
        TE: 'trailers',
      },
    })

    response = http.options('https://pizza-service.missinginfo.me/api/franchise', null, {
      headers: {
        Host: 'pizza-service.missinginfo.me',
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'authorization,content-type',
        Origin: 'https://pizza.missinginfo.me',
        DNT: '1',
        'Sec-GPC': '1',
        Connection: 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        Priority: 'u=4',
        'Cache-Control': 'no-cache',
        TE: 'trailers',
      },
    })
    sleep(15)

    // Order
    response = http.post(
      'https://pizza-service.missinginfo.me/api/order',
      '{"items":[{"menuId":3,"description":"Margarita","price":0.0042}],"storeId":"1","franchiseId":1}',
      {
        headers: {
          Host: 'pizza-service.missinginfo.me',
          Accept: '*/*',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Content-Type': 'application/json',
          Authorization:
            `Bearer ${vars.authToken}`,
          Origin: 'https://pizza.missinginfo.me',
          DNT: '1',
          'Sec-GPC': '1',
          Connection: 'keep-alive',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          Priority: 'u=0',
          'Cache-Control': 'no-cache',
          TE: 'trailers',
        },
      }
    )
    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      fail("order was *not* 200");
    }

    vars.jwt = response.json().jwt;

    response = http.options('https://pizza-service.missinginfo.me/api/order', null, {
      headers: {
        Host: 'pizza-service.missinginfo.me',
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'authorization,content-type',
        Origin: 'https://pizza.missinginfo.me',
        DNT: '1',
        'Sec-GPC': '1',
        Connection: 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        Priority: 'u=4',
        'Cache-Control': 'no-cache',
        TE: 'trailers',
      },
    })
    sleep(6.2)

    // Validate
    response = http.post(
      'https://pizza-factory.cs329.click/api/order/verify',
      `{"jwt":"${vars.jwt}"}`,
      {
        headers: {
          Host: 'pizza-factory.cs329.click',
          Accept: '*/*',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Content-Type': 'application/json',
          Authorization:
            `Bearer ${vars.authToken}`,
          Origin: 'https://pizza.missinginfo.me',
          DNT: '1',
          'Sec-GPC': '1',
          Connection: 'keep-alive',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'cross-site',
          Priority: 'u=0',
          'Cache-Control': 'no-cache',
        },
      }
    )

    response = http.options('https://pizza-factory.cs329.click/api/order/verify', null, {
      headers: {
        Host: 'pizza-factory.cs329.click',
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'authorization,content-type',
        Origin: 'https://pizza.missinginfo.me',
        DNT: '1',
        'Sec-GPC': '1',
        Connection: 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        Priority: 'u=4',
        'Cache-Control': 'no-cache',
      },
    })
  })
}