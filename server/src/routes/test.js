const { Router } = require("@desaubv/quik");
const { Status, Validator, ValidationException, Types } = require("@desaubv/quik/http");
const router = Router();

router.get((req, res) => {
    res
        .status(Status.OK)
        .send("Test");
});




// Body parser JSON
// router.post((req, res) => {
//     function ageValidator(value) {
//         if (value < 0) throw new ValidationException("Age must be greater os equial than 0");
//         return value;
//     }

//     const body = Validator.body(req.body, {
//         "name": {
//             type: [Types.Null, Types.String],
//             required: true
//         },
//         "age": {
//             type: Types.Int,
//             required: true,
//             validator: ageValidator
//         },
//         "status": {
//             type: Types.Array(Types.Int, Types.Boolean).canBeEmpty(),
//         },
//         "user": {
//             type: Types.Struct({
//                 "name": {
//                     type: [Types.Null, Types.String],
//                     required: true
//                 },
//                 "age": {
//                     type: Types.Int,
//                     required: true,
//                     validator: ageValidator
//                 },
//                 "user": {
//                     type: Types.Struct({
//                         "name": {
//                             type: [Types.Null, Types.String],
//                             required: true
//                         },
//                         "age": {
//                             type: Types.Int,
//                             required: true,
//                             validator: ageValidator
//                         }
//                     }),
//                     required: true
//                 }
//             }),
//             required: true
//         }
//     });

//     res.json(body);
// });


// Body parser TEXT
// router.post((req, res) => {
//     const body = Validator.text(req.body, {
//         minLength: 5,
//         maxLength: 255,
//         allowEmpty: false,
//         trim: true,
//         pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//         validator: (val) => val.toLocaleLowerCase()
        
//     });
    
//     res.send(body);
// })


// Body parser RAW
// router.post((req, res) => {
//     const body = Validator.text(req.body.toString("utf-8"), {
//         minLength: 5,
//         maxLength: 255,
//         allowEmpty: false,
//         trim: true,
//         pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//         validator: (val) => val.toLocaleLowerCase()
        
//     });
    
//     res.send(body);
// })



module.exports = router;