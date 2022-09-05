using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;

namespace DebugApp
{
    static class JSONParser
    {
        public static string Serialize<T>(T obj)
        {
            string result = string.Empty;
            using (MemoryStream stream = new MemoryStream())
            {
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(T));
                serializer.WriteObject(stream, serializer);

                result = Encoding.Default.GetString(stream.ToArray());
            }

            return result;
        }
        public static T Deserializer<T>(string jsonString)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(T));
                StreamWriter writer = new StreamWriter(stream);
                writer.Write(jsonString);
                writer.Flush();
                stream.Position = 0;

                T obj = (T)serializer.ReadObject(stream);
                return obj;
            }
        }

        [DataContract]
        public class Student
        {
            [DataMember]
            public string FullName { get; set; }
            [DataMember]
            public string JobTitle { get; set; }
            [DataMember]
            public string Contact { get; set; }
            [DataMember]
            public string Country { get; set; }
            [DataMember]
            public decimal ZIPCode { get; set; }
            [DataMember]
            public decimal Amount { get; set; }

        }
    }
}
