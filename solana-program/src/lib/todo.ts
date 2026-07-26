/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/todo.json`.
 */
export type Todo = {
  "address": "47YBnRTcL1rSLwiaShRtUbQoND3CZPkzZ2A4CdwMXGEP",
  "metadata": {
    "name": "todo",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "deleteTodoList",
      "discriminator": [
        219,
        147,
        161,
        14,
        111,
        161,
        197,
        203
      ],
      "accounts": [
        {
          "name": "todoList",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  100,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u64"
        }
      ]
    },
    {
      "name": "intialize",
      "discriminator": [
        201,
        47,
        109,
        231,
        39,
        130,
        61,
        10
      ],
      "accounts": [
        {
          "name": "accounts",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  100,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u64"
        },
        {
          "name": "taskId",
          "type": "u64"
        },
        {
          "name": "message",
          "type": "string"
        },
        {
          "name": "title",
          "type": "string"
        }
      ]
    },
    {
      "name": "update",
      "discriminator": [
        219,
        200,
        88,
        176,
        158,
        63,
        253,
        127
      ],
      "accounts": [
        {
          "name": "todoList",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  111,
                  100,
                  111
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "signer",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u64"
        },
        {
          "name": "taskId",
          "type": "u64"
        },
        {
          "name": "message",
          "type": "string"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "complete",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "todolist",
      "discriminator": [
        215,
        49,
        57,
        120,
        180,
        229,
        198,
        132
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "todoListNotFound",
      "msg": "Todo list ID does not exist."
    },
    {
      "code": 6001,
      "name": "taskNotFound",
      "msg": "Task ID does not exist."
    },
    {
      "code": 6002,
      "name": "taskAlreadyExists",
      "msg": "Task already exists."
    },
    {
      "code": 6003,
      "name": "maxTasksReached",
      "msg": "Maximum number of tasks reached."
    },
    {
      "code": 6004,
      "name": "emptyTitle",
      "msg": "Title cannot be empty."
    },
    {
      "code": 6005,
      "name": "emptyMessage",
      "msg": "Message cannot be empty."
    },
    {
      "code": 6006,
      "name": "unauthorized",
      "msg": "Unauthorized user."
    }
  ],
  "types": [
    {
      "name": "task",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "taskId",
            "type": "u64"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "complete",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "todolist",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "task",
            "type": {
              "vec": {
                "defined": {
                  "name": "task"
                }
              }
            }
          }
        ]
      }
    }
  ]
};
